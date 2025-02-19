# app/formatter/custom_bicycle_formatter.py

class CustomBicycleFormatter:
    @staticmethod
    def format(custom_bicycle, products):
        return {
            'id': custom_bicycle.id,
            'name': custom_bicycle.name,
            'price': custom_bicycle.price,
            'productInfo': products
        }
