from app.models.user import UserCart
from app.service.product.purchase_service import PurchaseService
from ... import db

class UserCartService:
    @staticmethod
    def add_product_to_cart(data):
        required_fields = ['user_id', 'purchase_id', 'sport_type', 'purchase_options']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return {'error': f'Missing required fields: {", ".join(missing_fields)}'}, 400

        user_id = data['user_id']
        purchase_id = data['purchase_id']
        sport_type = data['sport_type']
        purchase_options = data['purchase_options']
        
        custom_bicycle = PurchaseService.create_purchase(sport_type, purchase_id, purchase_options)

        if UserCart.query.filter_by(user_id=user_id, purchase_id=custom_bicycle.id, sport_type=sport_type).first():
            return {'error': 'Product already in cart'}, 409

        new_cart_item = UserCart(user_id=user_id, purchase_id=custom_bicycle.id, sport_type=sport_type)
        db.session.add(new_cart_item)
        db.session.commit()

        return {'message': 'Product added to cart successfully'}, 201

    @staticmethod
    def remove_product_from_cart(user_id, purchase_id):
        if not user_id or not purchase_id:
            return {'error': 'Missing required fields'}, 400

        cart_item = UserCart.query.filter_by(user_id=user_id, purchase_id=purchase_id).first()

        if not cart_item:
            return {'error': 'Product not found in cart'}, 404
        
        PurchaseService.delete_purchase(cart_item.sport_type, purchase_id)

        db.session.delete(cart_item)
        db.session.commit()
        return {'message': 'Product removed from cart successfully'}, 200

    @staticmethod
    def get_cart_items(user_id):
        if not user_id:
            return {'error': 'Missing required fields'}, 400

        cart_items = UserCart.query.filter_by(user_id=user_id).all()

        if not cart_items:
            return [], 200

        cart_items_list = {user_id: []}
        for item in cart_items:
            sport_purchase = PurchaseService.get_purchase(item.sport_type, item.purchase_id)
            cart_items_list[user_id].append({
                item.sport_type: sport_purchase
            })

        return cart_items_list, 200