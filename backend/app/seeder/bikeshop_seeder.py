from app import db
from app.models.product import Product, ProductOptions
from app.models.bicycle import Bicycle, BicyclePart
import random

def seed_products():
    products = [
        {
            "product_name": "frame_type",
            "product_type": "Bike",
            "quantity": 10,
            "price": 500.00,
            "active": True
        },
        {
            "product_name": "frame_finish",
            "product_type": "Bike",
            "quantity": 15,
            "price": 700.00,
            "active": True
        },
        {
            "product_name": "wheels",
            "product_type": "Bike",
            "quantity": 50,
            "price": 50.00,
            "active": True
        },
        {
            "product_name": "rim_color",
            "product_type": "Bike",
            "quantity": 100,
            "price": 20.00,
            "active": True
        },
        {
            "product_name": "chain",
            "product_type": "Bike",
            "quantity": 100,
            "price": 50.00,
            "active": True
        }
    ]

    for product_data in products:
        product = Product(**product_data)
        db.session.add(product)

    db.session.commit()

def seed_product_options():
    product_options = [
        {
            "option_name": "Full-suspension",
            "product_id": 1,
            "active": True
        },
        {
            "option_name": "diamond",
            "product_id": 1,
            "active": True
        },
        {
            "option_name": "step-through",
            "product_id": 1,
            "active": True
        },
        {
            "option_name": "Matte",
            "product_id": 2,
            "active": True
        },
        {
            "option_name": "shiny",
            "product_id": 2,
            "active": True
        },
        {
            "option_name": "Road wheels",
            "product_id": 3,
            "active": True
        },
        {
            "option_name": "mountain wheels",
            "product_id": 3,
            "active": True
        },
        {
            "option_name": "fat bike wheels",
            "product_id": 3,
            "active": True
        },
        {
            "option_name": "Red",
            "product_id": 4,
            "active": True
        },
        {
            "option_name": "black",
            "product_id": 4,
            "active": True
        },
        {
            "option_name": "blue",
            "product_id": 4,
            "active": True
        },
        {
            "option_name": "Single-speed chain",
            "product_id": 5,
            "active": True
        },
        {
            "option_name": "8-speed chain",
            "product_id": 5,
            "active": True
        }
    ]

    for option_data in product_options:
        option = ProductOptions(**option_data)
        db.session.add(option)

    db.session.commit()

def seed_bicycles():
    bicycles = [
        {
            "name": "Mountain Bike",
            "sold": False,
            "price": 1200.00
        },
        {
            "name": "Road Bike",
            "sold": False,
            "price": 1500.00
        },
        {
            "name": "Hybrid Bike",
            "sold": False,
            "price": 800.00
        },
        {
            "name": "Electric Bike",
            "sold": False,
            "price": 2500.00
        },
        {
            "name": "Folding Bike",
            "sold": False,
            "price": 600.00
        }
    ]

    for bicycle_data in bicycles:
        bicycle = Bicycle(**bicycle_data)
        db.session.add(bicycle)

    db.session.commit()

def seed_bicycle_parts():
    product_options = {
        1: [1, 2, 3],  # frame_type options
        2: [4, 5],     # frame_finish options
        3: [6, 7, 8],  # wheels options
        4: [9, 10, 11],# rim_color options
        5: [12, 13]    # chain options
    }

    bicycle_parts = []

    for bicycle_id in range(1, 6):
        for product_id, options in product_options.items():
            for option_id in options:
                part_data = {
                    "bicycle_id": bicycle_id,
                    "product_id": product_id,
                    "product_option_id": option_id
                }
                bicycle_parts.append(part_data)

    for part_data in bicycle_parts:
        part = BicyclePart(**part_data)
        db.session.add(part)

    db.session.commit()

def seed_database():
    print("Seeding database...")
    seed_products()
    seed_product_options()
    seed_bicycles()
    seed_bicycle_parts()