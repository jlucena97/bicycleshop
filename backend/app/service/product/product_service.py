from ... import db
from app.models.product import Product
from app.service.product.product_option_service import ProductOptionService

class ProductService:
    @staticmethod
    def get_product(product_id):
        return Product.query.get(product_id)
    
    @staticmethod
    def get_product_by_product_name(product_name):
        return Product.query.filter_by(product_name=product_name).first()
    
    @staticmethod
    def get_all_products():
        products = Product.query.all()
        return [product.to_dict() for product in products]
    
    @staticmethod
    def get_all_products_by_type(product_type):
        products = Product.query.filter_by(product_type=product_type).all()
        return [product.to_dict() for product in products]
        
    @staticmethod
    def create_product(data):
        new_product = Product(
            product_name=data.get('product_name'),
            product_type=data.get('product_type'),
            quantity=data.get('quantity'),
            price=data.get('price'),
            active=data.get('active', True)
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product
    
    @staticmethod
    def update_product(product_id, data):
        product = Product.query.get(product_id)
        if product:
            product.product_name = data.get('product_name', product.product_name)
            product.product_type = data.get('product_type', product.product_type)
            product.quantity = data.get('quantity', product.quantity)
            product.price = data.get('price', product.price)
            product.active = data.get('active', product.active)
            db.session.commit()
            return product
        else:
            return None

    @staticmethod
    def update_quantity_by_product_id(product_id, quantity):
        product = Product.query.get(product_id)
        if product:
            product.quantity = quantity
            db.session.commit()
            return product
        else:
            return None

    @staticmethod
    def product_quantity_subtraction(product, subtraction_quantity):
        if isinstance(product, Product):
            product.quantity -= subtraction_quantity
            db.session.commit()
            return product
        else:
            return None
    
    @staticmethod
    def create_entire_product(data):
        product = ProductService.create_product(data)
        if isinstance(product, Product):
            product_options = data.pop('productOptions', [])
            for option in product_options:
                ProductOptionService.add_product_option(product.id, option)
        
            return product.to_dict()
        
    @staticmethod
    def update_entire_product(data):
        product = ProductService.update_product(data.get('id'), data)
        if product:
            product_options = data.pop('productOptions', [])
            if product_options:
                for option in product_options:
                    ProductOptionService.update_product_option(product.id, option)
        
            return product.to_dict()
        else:
            return {'message': 'product not found'}, 404
        
    @staticmethod
    def get_entire_product(product_id):
        product = ProductService.get_product(product_id)
        if product:
            product_dict = product.to_dict()
            product_dict['productOptions'] = ProductOptionService.get_all_product_options_by_product_id(product_id)
            return product_dict
        else:
            return {'message': 'product not found'}, 404
        

    @staticmethod
    def delete_entire_product(product_id):
        product = ProductService.get_product(product_id)
        if product:
            ProductOptionService.delete_all_product_options_by_product_id(product_id)
            db.session.delete(product)
            db.session.commit()
            return {'message': 'product deleted successfully'}
        else:
            return {'message': 'product not found'}, 404