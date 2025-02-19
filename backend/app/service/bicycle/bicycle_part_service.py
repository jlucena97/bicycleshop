from app import db
from app.models.bicycle import BicyclePart
from app.formatter.bicycle_formatter import BicycleFormatter

class BicyclePartService:

    @staticmethod
    def get(bicycle_part_id):
        return BicyclePart.query.get(bicycle_part_id)

    @staticmethod
    def get_all():
        return BicyclePart.query.all()
    
    @staticmethod
    def get_all_by_bicycle_id(bicycle_id):
        bicycle_parts = BicyclePart.query.filter_by(bicycle_id=bicycle_id).all()
        return BicycleFormatter.format_bicycle_parts(bicycle_parts)
    
    @staticmethod
    def create(data):
        bicycle_part = BicyclePart(**data)
        db.session.add(bicycle_part)
        db.session.commit()
        return bicycle_part

    @staticmethod
    def delete(bicycle_part_id):
        bicycle_part = BicyclePart.query.get(bicycle_part_id)
        if bicycle_part:
            db.session.delete(bicycle_part)
            db.session.commit()
            return True
        return False

    @staticmethod
    def delete_by_bicycle_id(bicycle_id):
        bicycle_parts = BicyclePart.query.filter_by(bicycle_id=bicycle_id).all()
        if bicycle_parts:
            for part in bicycle_parts:
                db.session.delete(part)
            db.session.commit()
            return True
        return False

    @staticmethod
    def update(bicycle_part_id, data):
        bicycle_part = BicyclePart.query.get(bicycle_part_id)
        if bicycle_part:
            for key, value in data.items():
                setattr(bicycle_part, key, value)
            db.session.commit()
            return bicycle_part
        return None
    
    @staticmethod
    def create_entire_bicycle_part(bicycle_id, product_data):
        for product in product_data:
            if product and product.get('active'):
                for option in product.get('productOptions', []):
                    if option.get('active'):
                        BicyclePartService.create({
                            'bicycle_id': bicycle_id,
                            'product_id': product['id'],
                            'product_option_id': option['id']
                        })