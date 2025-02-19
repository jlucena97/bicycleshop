# app/models/bicycle.py
from .. import db

class Bicycle(db.Model):
    __tablename__ = 'bicycle'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    sold = db.Column(db.Boolean, default=False)
    price = db.Column(db.Float, nullable=False)

    def __init__(self, name, sold=False, price=0.0):
        self.name = name
        self.sold = sold
        self.price = price

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'sold': self.sold,
            'price': self.price
        }

class BicyclePart(db.Model):
    __tablename__ = 'bicycle_part'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bicycle_id = db.Column(db.Integer, db.ForeignKey('bicycle.id'), nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    product_option_id = db.Column(db.Integer, nullable=False)

    def __init__(self, bicycle_id, product_id, product_option_id):
        self.bicycle_id = bicycle_id
        self.product_id = product_id
        self.product_option_id = product_option_id

    def to_dict(self):
        return {
            'id': self.id,
            'bicycle_id': self.bicycle_id,
            'product_id': self.product_id,
            'product_option_id': self.product_option_id
        }
    
