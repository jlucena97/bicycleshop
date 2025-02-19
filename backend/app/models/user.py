# app/models/user.py
from .. import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mail = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    active = db.Column(db.Boolean, default=True)

    def __init__(self, mail, password, active=True):
        self.mail = mail
        self.password = password
        self.active = active

    def to_dict(self):
        return {
            'id': self.id,
            'mail': self.mail,
            'active': self.active
        }

class UserCart(db.Model):
    __tablename__ = 'user_cart'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    purchase_id = db.Column(db.Integer, nullable=False)
    sport_type = db.Column(db.String(50), nullable=False)

    def __init__(self, user_id, purchase_id, sport_type):
        self.user_id = user_id
        self.purchase_id = purchase_id
        self.sport_type = sport_type

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'purchase_id': self.purchase_id,
            'sport_type': self.sport_type
        }
