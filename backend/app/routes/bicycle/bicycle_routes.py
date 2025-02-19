# app/routes/bicycle_routes.py
from flask_restful import Resource
from flask import request
from app.service.bicycle.bicycle_service import BicycleService
from app.service.bicycle.bicycle_part_service import BicyclePartService

class BicycleResource(Resource):
    def get(self, bicycle_id):
        return BicycleService.get_bicycle(bicycle_id)

class BicyclePutResource(Resource):
    def put(self):
        data = request.get_json()
        return BicycleService.update_entire_bicycle(data)

class BicycleDeleteResource(Resource):
    def delete(self):
        data = request.get_json()
        return BicycleService.delete_entire_bicycle(data)

class BicyclePostResource(Resource):
    def post(self):
        data = request.get_json()
        return BicycleService.create_entire_bicycle(data)

class BicycleListResource(Resource):
    def get(self, category):
        bicycles = BicycleService.get_all_bicycles(category)
        return [bicycle.to_dict() for bicycle in bicycles]

class BicyclePartListResource(Resource):
    def get(self, bicycle_id):
        return BicyclePartService.get_all_by_bicycle_id(bicycle_id)
