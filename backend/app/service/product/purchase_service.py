from ... import db
import json
from app.models.purchase import Purchase
from app.models.product import Product, ProductOptions
from app.service.bicycle.custom_bicycle_service import CustomBicycleService
from app.service.bicycle.bicycle_service import BicycleService
from app.service.bicycle.custom_bicycle_part_service import CustomBicyclePartService
from app.models.custom_bicycle import CustomBicycle
from app.service.product.product_service import ProductService
from app.service.product.product_option_service import ProductOptionService
from app.models.custom_bicycle import CustomBicycle

class PurchaseService:    

    @staticmethod
    def get_purchase(purchase_type, purchase_id):
        if purchase_type == 'Purchase':
            # Option to get only the purchase
            purchase = Purchase.query.filter_by(id=purchase_id).first()
            if purchase:
                return purchase, 200
            else:
                return {'message': 'Purchase not found'}, 404
        if purchase_type == 'Bike':
            return PurchaseService.get_bike_purchase(purchase_id)
        else:
            return {'message': 'Purchase type not supported'}, 400
        
    @staticmethod
    def delete_purchase(purchase_type, purchase_id):
        if purchase_type == 'Bike':
            # purchase id is the custom bicycle id
            return PurchaseService.delete_bike_purchase(purchase_id)
        else:
            return {'message': 'Purchase type not supported'}, 400  
    @staticmethod
    def create_purchase(purchase_type, purchase_id, purchase_options):
        if purchase_type == 'Bike':
            #purchase id is the custom bicycle id
            return PurchaseService.create_bike_purchase(purchase_id, purchase_options, purchase_type)
        else:
            return {'message': 'Purchase type not supported'}, 400



    # Bike purchase methods
    def create_bike_purchase(purchase_id, purchase_options, purchase_type):
        custom_bicycle = CustomBicycleService.get_bicycle_and_create_custom(purchase_id)
        if isinstance(custom_bicycle, CustomBicycle):
            BicycleService.update_bicycle_field(custom_bicycle.bicycle_id, 'sold', True)
            for key, value in purchase_options.items():
                product_purchase = ProductService.get_product_by_product_name(key)
                product_option_purchase = ProductOptionService.get_product_option_by_option_name(value)
                if isinstance(product_purchase, Product) and isinstance(product_option_purchase, ProductOptions):
                    ProductService.product_quantity_subtraction(product_purchase, 1)
                    # Generate custom bicycle part data
                    custom_bicycle_part_data = {'custom_bicycle_id': custom_bicycle.id, 'product_id': product_purchase.id, 'product_option_id': product_option_purchase.id}
                    # Create custom bicycle part
                    custom_bicycle_part = CustomBicyclePartService.create_custom_bicycle_part(custom_bicycle_part_data)
                    if not custom_bicycle_part:
                        return {'error': 'Error creating custom bicycle part'}, 500
                else:
                    return {'error': 'Error finding product or product option'}, 404
            # If all parts are created successfully, create purchase
            purchase = Purchase(purchase_id=purchase_id, purchase_type=purchase_type, purchase_options=json.dumps(purchase_options))
            db.session.add(purchase)
            db.session.commit()
            #return custom bicycle
            return custom_bicycle
        else:
            return {'error': 'Error creating custom bicycle'}, 500
        

    def delete_bike_purchase(purchase_id):
        custom_bicycle = CustomBicycleService.get_custom_bicycle_by_id(purchase_id)
        if(isinstance(custom_bicycle, CustomBicycle)):
            BicycleService.update_bicycle_field(custom_bicycle.bicycle_id, 'sold', False)
            delete_custom_bicycle = CustomBicycleService.delete_custom_bicycle_by_id(custom_bicycle.id)
            delete_custom_bicycle_parts = CustomBicyclePartService.delete_custom_bicycle_part_by_custom_bicycle_id(custom_bicycle.id)
            if delete_custom_bicycle and delete_custom_bicycle_parts:
                # If custom bicycle and parts are deleted successfully, delete purchase
                purchase = Purchase.query.filter_by(id=purchase_id).first()
                if purchase:
                    db.session.delete(purchase)
                    db.session.commit()
                # Return success message
                return {'message': 'Bike removed from cart successfully'}, 200
            else:
                return {'message': 'Bike not found'}, 404
            
    def get_bike_purchase(purchase_id):
        custom_bicycle = CustomBicycleService.get_custom_bicycle(purchase_id)
        if custom_bicycle:
            return custom_bicycle, 200
        else:
            return {'message': 'Bike not found'}, 404
        
        