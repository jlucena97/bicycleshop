from app.models.custom_bicycle import CustomBicyclePart
from ... import db

class CustomBicyclePartService:
    @staticmethod
    def get_custom_bicycle_part(part_id):
        return CustomBicyclePart.query.get(part_id)

    @staticmethod
    def get_all_custom_bicycle_parts_by_custom_bicycle_id(custom_bicycle_id):
        return CustomBicyclePart.query.filter_by(custom_bicycle_id=custom_bicycle_id).all()

    @staticmethod
    def create_custom_bicycle_part(data):
        new_part = CustomBicyclePart(**data)
        db.session.add(new_part)
        db.session.commit()
        return new_part

    @staticmethod
    def update_custom_bicycle_part(part_id, data):
        part = CustomBicyclePart.query.get(part_id)
        if not part:
            return None
        for key, value in data.items():
            setattr(part, key, value)
        db.session.commit()
        return part

    @staticmethod
    def delete_custom_bicycle_part(part_id):
        part = CustomBicyclePart.query.get(part_id)
        if not part:
            return None
        db.session.delete(part)
        db.session.commit()
        return part

    @staticmethod
    def delete_custom_bicycle_part_by_custom_bicycle_id(custom_bicycle_id):
        parts = CustomBicyclePart.query.filter_by(custom_bicycle_id=custom_bicycle_id).all()
        if not parts:
            return []
        for part in parts:
            db.session.delete(part)
        db.session.commit()
        return parts