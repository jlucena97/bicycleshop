# app/models/custom_bicycle.py
from .. import db

class CustomBicycle(db.Model):
    __tablename__ = 'custom_bicycle'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycle.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __init__(self, bicycle_id, name, sold=False, price=0.0):
        self.bicycle_id = bicycle_id
        self.name = name
        self.price = price

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }

class CustomBicyclePart(db.Model):
    __tablename__ = 'custom_bicycle_part'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    custom_bicycle_id = db.Column(db.Integer, db.ForeignKey('custom_bicycle.id'), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    product_option_id = db.Column(db.Integer, nullable=False)

    def __init__(self, custom_bicycle_id, product_id, product_option_id):
        self.custom_bicycle_id = custom_bicycle_id
        self.product_id = product_id
        self.product_option_id = product_option_id

    def to_dict(self):
        return {
            'id': self.id,
            'custom_bicycle_id': self.custom_bicycle_id,
            'product_id': self.product_id,
            'product_option_id': self.product_option_id
        }
    
