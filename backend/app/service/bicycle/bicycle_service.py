# app/service/bicycle_service.py
from app.models.bicycle import Bicycle
from app.service.bicycle.bicycle_part_service import BicyclePartService
from app.service.product.product_service import ProductService
from app.service.product.product_option_service import ProductOptionService
from app.formatter.bicycle_formatter import BicycleFormatter
from ... import db

class BicycleService:
    @staticmethod
    def get_bicycle(bicycle_id):
        bicycle = Bicycle.query.get_or_404(bicycle_id)
        if not bicycle:
            return None

        bicycle_parts = BicyclePartService.get_all_by_bicycle_id(bicycle_id)
        products = []

        for product_id, parts in bicycle_parts.items():
            product_detail = BicycleService._get_product_detail(product_id, parts)
            if product_detail:
                products.append(product_detail)

        return BicycleFormatter.format(bicycle, products)

    @staticmethod
    def _get_product_detail(product_id, parts):
        product = ProductService.get_product(product_id)
        if not product:
            return None

        product_detail = product.to_dict()
        product_detail['productOptions'] = [
            ProductOptionService.get_product_option_by_option_id(part['product_option_id']).to_dict()
            for part in parts if ProductOptionService.get_product_option_by_option_id(part['product_option_id'])
        ]
        return product_detail

    @staticmethod
    def basic_get_bicycle(bicycle_id):
        return Bicycle.query.get_or_404(bicycle_id)

    @staticmethod
    def delete_bicycle(bicycle_id):
        bicycle = BicycleService.basic_get_bicycle(bicycle_id)
        db.session.delete(bicycle)
        db.session.commit()
        return True

    @staticmethod
    def update_bicycle(data):
        bicycle = Bicycle.query.get_or_404(data.get('id'))
        BicycleService._update_bicycle_fields(bicycle, data)
        db.session.commit()
        return {"status": "success", "message": "Bicycle updated successfully"}

    @staticmethod
    def _update_bicycle_fields(bicycle, data):
        for field in ['name', 'sold', 'price']:
            if field in data:
                setattr(bicycle, field, data[field])

    @staticmethod
    def update_bicycle_field(bicycle_id, field_name, field_value):
        bicycle = Bicycle.query.get_or_404(bicycle_id)
        if hasattr(bicycle, field_name):
            setattr(bicycle, field_name, field_value)
            db.session.commit()
            return {"status": "success", "message": f"Bicycle {field_name} updated successfully"}
        else:
            return {"status": "error", "message": f"Field {field_name} does not exist on Bicycle"}

    @staticmethod
    def get_all_bicycles(category):
        if category == 'user':
            return Bicycle.query.filter_by(sold=0).all()
        else:
            return Bicycle.query.all()

    @staticmethod
    def create_bicycle(data):
        bicycle = Bicycle(**data)
        db.session.add(bicycle)
        db.session.commit()
        return bicycle

    @staticmethod
    def create_entire_bicycle(data):
        bicycle = BicycleService.create_bicycle({'name': data['name'], 'sold': data['sold'], 'price': data['price']})
        if isinstance(bicycle, Bicycle):
            BicyclePartService.create_entire_bicycle_part(bicycle.id, data['productDetail'])
            return {"status": "success", "message": "Bicycle created successfully"}, 201
        else:
            return {"status": "error", "message": "Error creating bicycle"}, 400

    @staticmethod
    def update_entire_bicycle(data):
        BicycleService.update_bicycle(data)
        BicyclePartService.delete_by_bicycle_id(data['id'])
        BicyclePartService.create_entire_bicycle_part(data['id'], data['productDetail'])
        return {"status": "success", "message": "Bicycle updated successfully"}

    @staticmethod
    def delete_entire_bicycle(data):
        BicyclePartService.delete_by_bicycle_id(data.get('id'))
        return BicycleService.delete_bicycle(data.get('id'))
