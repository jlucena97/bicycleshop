# app/formatter/bicycle_formatter.py
from app.models.bicycle import BicyclePart
from collections import defaultdict

class BicycleFormatter:
    @staticmethod
    def format(bicycle, products):
        return {
            'id': bicycle.id,
            'name': bicycle.name,
            'sold': bicycle.sold,
            'price': bicycle.price,
            'productDetail': products
        }
    
    @staticmethod
    def format_bicycle_parts(bicycle_parts):
        grouped_parts = defaultdict(list)
        for part in bicycle_parts:
            grouped_parts[part.product_id].append({
            'id': part.id,
            'bicycle_id': part.bicycle_id,
            'product_option_id': part.product_option_id
            })
        return dict(grouped_parts)
