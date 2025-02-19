from flask_restful import Resource, reqparse
from app.service.product.product_option_service import ProductOptionService
    
class ProductOptionListResource(Resource):
    def get(self, product_id):
        options = ProductOptionService.get_all_product_options_by_product_id(product_id)
        if options:
            return {'options': options}, 200
        return {'message': 'options not found'}, 404