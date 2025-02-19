from flask import Blueprint, Flask, request, jsonify
from flask_restful import Resource
from app.service.user.user_cart_service import UserCartService
from app.models.user import UserCart

class UserCartActions(Resource):
    def get(self, user_id):
        return UserCartService.get_cart_items(user_id)

class UserCartPostActions(Resource):
    def post(self):
        data = request.get_json()
        return UserCartService.add_product_to_cart(data)

class UserCartDeleteActions(Resource):
    def delete(self, user_id, purchase_id):
        return UserCartService.remove_product_from_cart(user_id, purchase_id)    
