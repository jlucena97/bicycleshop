from app.models.user import User
from ... import db

class UserService:
    @staticmethod
    def get_user_by_id(user_id):
        user = User.query.get_or_404(user_id)
        return {
            'id': user.id,
            'mail': user.mail,
            'active': user.active
        }

    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'User deleted successfully'}
        return {'message': 'User not found'}

    @staticmethod
    def get_user_by_mail_and_password(mail, password):
        user = User.query.filter_by(mail=mail, password=password).first()
        if user:
            return {"success": True, "id": user.id}
        return {"message": "User not found"}

    @staticmethod
    def create_user(mail, password):
        user = User(mail=mail, password=password)
        db.session.add(user)
        db.session.commit()
        if user.id:
            return {"success": True, "id": user.id}
        return {'message': 'User not created'}
