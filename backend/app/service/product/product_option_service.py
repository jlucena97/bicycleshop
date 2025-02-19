from ... import db
from app.models.product import Product, ProductOptions

class ProductOptionService:
    @staticmethod
    def get_product_option_by_option_id(option_id):
        return ProductOptions.query.get(option_id)
    
    @staticmethod
    def get_product_option_by_option_name(option_name):
        return ProductOptions.query.filter_by(option_name=option_name).first()

    @staticmethod
    def get_all_product_options_by_product_id(product_id):
        product_options = ProductOptions.query.filter_by(product_id=product_id).all()
        if product_options:
            return [product_options.to_dict() for product_options in product_options]
        else:
            return None
        
    @staticmethod
    def add_product_option(product_id, data):
        product = Product.query.get(product_id)
        if product:
            new_option = ProductOptions(
                product_id=product_id,
                option_name=data.get('option_name'),
                active=data.get('active')
            )
            db.session.add(new_option)
            db.session.commit()

    @staticmethod
    def update_product_option(option_id, data):
        option = ProductOptions.query.get(option_id)
        if option:
            option.option_name = data.get('option_name', option.option_name)
            option.active = data.get('active', option.active)
            db.session.commit()

    @staticmethod
    def delete_product_option(option_id):
        option = ProductOptions.query.get(option_id)
        if option:
            db.session.delete(option)
            db.session.commit()
            return True
        else:
            return False
        

    @staticmethod
    def delete_all_product_options_by_product_id(product_id):
        product_options = ProductOptions.query.filter_by(product_id=product_id).all()
        if product_options:
            for option in product_options:
                db.session.delete(option)
            db.session.commit()
            return True
        else:
            return False