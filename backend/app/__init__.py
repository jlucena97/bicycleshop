# app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from sqlalchemy import inspect
from app.config import Config

# Initialize extensions outside app factory
db = SQLAlchemy()

def create_app(config_class=None):
    app = Flask(__name__)
    app.config.from_object(config_class or Config)
    
    CORS(app)
    
    db.init_app(app)
    api = Api(app)
    app.api = api
    
    with app.app_context():
        from app.models.purchase import Purchase
        register_resources(app)
        setup_database()
    
    return app

def register_resources(app):
    from .routes.bicycle.bicycle_routes import (
        BicycleResource, BicycleListResource, BicyclePartListResource, 
        BicyclePostResource, BicyclePutResource, BicycleDeleteResource
    )
    from .routes.user.user_cart_routes import (
        UserCartActions, UserCartPostActions, UserCartDeleteActions
    )
    from .routes.user.user_routes import UserPostResource
    from .routes.product.product_routes import (
        ProductResource, ProductListResource, ProductPostResource, ProductPutResource, ProductDeleteResource
    )
    from .routes.product.product_options_routes import ProductOptionListResource
    
    # Define the resources and their corresponding routes
    resources = [
        (BicycleListResource, '/api/bicycles/<string:category>'),
        (BicyclePostResource, '/api/bicycles/add'),
        (BicyclePutResource, '/api/bicycles/update'),
        (BicycleDeleteResource, '/api/bicycles/delete'),
        (BicyclePartListResource, '/api/bicycle_parts/<int:bicycle_id>'),
        (BicycleResource, '/api/bicycles/<int:bicycle_id>'),
        (UserCartPostActions, '/api/cart'),
        (UserCartDeleteActions, '/api/cart/<int:user_id>/<int:purchase_id>'),
        (UserCartActions, '/api/cart/<int:user_id>'),
        (UserPostResource, '/api/user'),
        (ProductListResource, '/api/products/<string:product_type>'),
        (ProductResource, '/api/products/<int:product_id>'),
        (ProductOptionListResource, '/api/products/<int:product_id>/options'),
        (ProductPostResource, '/api/products/add'),
        (ProductPutResource, '/api/products/update'),
        (ProductDeleteResource, '/api/products/delete')
    ]
    
    for resource, route in resources:
        app.api.add_resource(resource, route)

def setup_database():
    inspector = inspect(db.engine)
    if not inspector.get_table_names():
        db.create_all()
        seed_database()
    else:
        check_and_seed_data()

def seed_database():
    from app.seeder.bikeshop_seeder import seed_database
    seed_database()

def check_and_seed_data():
    from app.seeder.bikeshop_seeder import seed_database
    if db.session.query(db.metadata.tables['bicycle']).count() == 0:
        seed_database()
