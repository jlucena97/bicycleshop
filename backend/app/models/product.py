from .. import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    product_name = db.Column(db.String, index=True, nullable=False)
    product_type = db.Column(db.String, index=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    active = db.Column(db.Boolean, default=True)

    def __init__(self, product_name, product_type, quantity, price, active=True):
        self.product_name = product_name
        self.product_type = product_type
        self.quantity = quantity
        self.price = price
        self.active = active

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'product_type': self.product_type,
            'quantity': self.quantity,
            'price': self.price,
            'active': self.active
        }

class ProductOptions(db.Model):
    __tablename__ = 'product_options'

    id = db.Column(db.Integer, primary_key=True, index=True, autoincrement=True)
    option_name = db.Column(db.String, index=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    active = db.Column(db.Boolean, default=True)

    def __init__(self, option_name, product_id, active=True):
        self.option_name = option_name
        self.product_id = product_id
        self.active = active

    def to_dict(self):
        return {
            'id': self.id,
            'option_name': self.option_name,
            'product_id': self.product_id,
            'active': self.active
        }