# app/routes/user/user_routes.py
from flask_restful import Resource, reqparse
from app.service.user.user_service import UserService
from flask import request

class UserResource(Resource):
    def get(self, user_id):
        user = UserService.get_user_by_id(user_id)
        if user:
            return user, 200
        return {'message': 'User not found'}, 404

    def delete(self, user_id):
        if UserService.delete_user(user_id):
            return {'message': 'User deleted successfully'}, 200
        return {'message': 'User not found'}, 404
    
class UserPostResource(Resource):  
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help='Email cannot be blank')
        parser.add_argument('password', type=str, required=True, help='Password cannot be blank')
        parser.add_argument('registering', type=bool, required=False, default=False)
        args = parser.parse_args()
        
        email = args['email']
        password = args['password']
        registering = args['registering']
        
        if registering:
            user = UserService.create_user(email, password)
            if user:
                return user, 201
            return {'message': 'User creation failed'}, 400
        else:
            user = UserService.get_user_by_mail_and_password(email, password)
            if user:
                return user, 200
            return {'message': 'Invalid email or password'}, 401
