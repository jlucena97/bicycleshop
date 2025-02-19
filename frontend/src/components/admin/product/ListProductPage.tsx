import React, { useEffect, useState } from 'react';
import { ProductDetail, Product } from '../../../types/products';
import CreateProduct from './CreateProduct';

const ListProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const product_type = 'all';

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products/' + product_type); // Replace with your API endpoint
            const data = await response.json();

            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async (productId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`); // Replace with your API endpoint
            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    };

    const handleEdit = (id: number) => {
        console.log(`Edit product with id: ${id}`);
        fetchProduct(id);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="flex justify-between items-center w-max mx-auto p-2 bg-white shadow-md rounded mb-4">
            <button
            onClick={() => {product ? window.location.href = '/list-product' : window.location.href = '/admin'}}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600"
            >
            {product ? 'Back to Product List' : 'Back to Admin'}
            </button>
        </div>
            {!product && (
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Product List</h1>
                    <div className="grid grid-cols-7 gap-4 bg-white border border-gray-200">
                    <div className="font-bold py-2 px-4 border-b">ID</div>
                    <div className="font-bold py-2 px-4 border-b">Name</div>
                    <div className="font-bold py-2 px-4 border-b">Type</div>
                    <div className="font-bold py-2 px-4 border-b">Quantity</div>
                    <div className="font-bold py-2 px-4 border-b">Price</div>
                    <div className="font-bold py-2 px-4 border-b">Active</div>
                    <div className="font-bold py-2 px-4 border-b">Edit</div>
                    {products.map(product => (
                        <React.Fragment key={product.id}>
                        <div className="py-2 px-4 border-b">{product.id}</div>
                        <div className="py-2 px-4 border-b">{product.product_name}</div>
                        <div className="py-2 px-4 border-b">{product.product_type}</div>
                        <div className="py-2 px-4 border-b">{product.quantity}</div>
                        <div className="py-2 px-4 border-b">{product.price}</div>
                        <div className="py-2 px-4 border-b">{product.active ? 'Yes' : 'No'}</div>
                        <div className="py-2 px-4 border-b">
                            <button 
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => handleEdit(product.id)}
                            >
                                Edit
                            </button>
                        </div>
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            )}
            {product && <CreateProduct productDetail={product} />}
        </>
    );
};

export default ListProductPage;