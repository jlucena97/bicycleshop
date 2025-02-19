# app/models/purchase.py
from .. import db
from sqlalchemy.dialects.postgresql import JSON

class Purchase(db.Model):
    __tablename__ = 'purchase'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    purchase_id = db.Column(db.Integer, nullable=False)
    purchase_type = db.Column(db.String(50), nullable=False)
    purchase_options = db.Column(JSON, nullable=False)

    def __init__(self, purchase_id, purchase_type, purchase_options):
        self.purchase_id = purchase_id
        self.purchase_type = purchase_type
        self.purchase_options = purchase_options

    def to_dict(self):
        return {
            'id': self.id,
            'purchase_id': self.purchase_id,
            'purchase_type': self.purchase_type,
            'purchase_options': self.purchase_options
        }
