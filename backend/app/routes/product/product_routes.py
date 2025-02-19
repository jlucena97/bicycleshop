from flask import request
from flask_restful import Resource, reqparse
from app.service.product.product_service import ProductService
from app.service.product.product_option_service import ProductOptionService

class ProductResource(Resource):
    def get(self, product_id):
        return ProductService.get_entire_product(product_id)
    
    def get_all_products_by_type(self, product_type):
        products = ProductService.get_all_products_by_type(product_type)
        if products:
            return {'products': products}, 200
        return {'message': 'no products found for this type'}, 404

class ProductDeleteResource(Resource):
    def delete(self):
        data = request.get_json()
        success = ProductService.delete_entire_product(data.get('id'))
        if success:
            return {'message': 'product deleted'}, 200
        return {'message': 'product not found'}, 404

class ProductPutResource(Resource):
    def put(self):
        data = request.get_json()
        return ProductService.update_entire_product(data)

class ProductPostResource(Resource):
    def post(self):
        data = request.get_json()
        return ProductService.create_entire_product(data)

class ProductListResource(Resource):
    def get(self, product_type=None):     
        if product_type:
            if product_type != 'all':
                products = ProductService.get_all_products_by_type(product_type)
                if products:
                    return {'products': products}, 200
                else:
                    return {'message': 'no products found for this type'}, 404
            else:
                products = ProductService.get_all_products()
                return {'products': products}, 200