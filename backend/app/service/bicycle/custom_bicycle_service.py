from app.models.custom_bicycle import CustomBicycle
from app.models.bicycle import Bicycle
from app.service.bicycle.custom_bicycle_part_service import CustomBicyclePartService
from app.service.product.product_service import ProductService
from app.service.product.product_option_service import ProductOptionService
from app.formatter.custom_bicycle_formatter import CustomBicycleFormatter

from ... import db

class CustomBicycleService:
    @staticmethod
    def create_custom_bicycle(data):
        new_bicycle = CustomBicycle(**data)
        db.session.add(new_bicycle)
        db.session.commit()
        return new_bicycle

    @staticmethod
    def update_custom_bicycle(bicycle_id, data):
        bicycle = CustomBicycle.query.get(bicycle_id)
        if not bicycle:
            return None
        for key, value in data.items():
            setattr(bicycle, key, value)
        db.session.commit()
        return bicycle

    @staticmethod
    def delete_custom_bicycle_by_id(custom_bicycle_id):
        custom_bicycle = CustomBicycle.query.get(custom_bicycle_id)
        if not custom_bicycle:
            return False
        db.session.delete(custom_bicycle)
        db.session.commit()
        return True

    @staticmethod
    def get_bicycle_and_create_custom(bicycle_id):
        bicycle = Bicycle.query.get(bicycle_id)
        if not bicycle:
            return None
        custom_data = {
            'bicycle_id': bicycle.id,
            'name': bicycle.name,
            'sold': bicycle.sold,
            'price': bicycle.price
        }
        custom_bicycle = CustomBicycle(**custom_data)
        db.session.add(custom_bicycle)
        db.session.commit()
        return custom_bicycle

    @staticmethod
    def get_custom_bicycle_by_id(custom_bicycle_id):
        return CustomBicycle.query.get(custom_bicycle_id)

    @staticmethod
    def get_custom_bicycle(custom_bicycle_id):
        custom_bicycle = CustomBicycle.query.get_or_404(custom_bicycle_id)
        bicycle_parts = CustomBicyclePartService.get_all_custom_bicycle_parts_by_custom_bicycle_id(custom_bicycle_id)
        products = CustomBicycleService._get_products_from_parts(bicycle_parts)
        return CustomBicycleFormatter.format(custom_bicycle, products)

    @staticmethod
    def _get_products_from_parts(bicycle_parts):
        products = []
        for part in bicycle_parts:
            product_info = {}
            if part.product_id:
                product = ProductService.get_product(part.product_id)
                if product:
                    product_info['product'] = product.to_dict()
            if part.product_option_id:
                product_option = ProductOptionService.get_product_option_by_option_id(part.product_option_id)
                if product_option:
                    product_info['productOption'] = product_option.to_dict()
            if product_info:
                products.append(product_info)
        return products