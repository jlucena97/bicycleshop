import React, { useState, useEffect } from 'react';
import { ProductDetail, CreateProductProps } from '../../../types/products';

const CreateProduct: React.FC<CreateProductProps> = ({ productDetail }) => {
    const [product, setProduct] = useState<ProductDetail>({
        id: 0,
        product_name: '',
        product_type: 'Bike',
        quantity: 0,
        price: 0,
        active: true,
        productOptions: []
    });

    useEffect(() => {
        if (productDetail) {
            setProduct(productDetail);
        }
    }, [productDetail]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newOptions = [...product.productOptions];
        newOptions[index] = { ...newOptions[index], [name]: value };
        setProduct({ ...product, productOptions: newOptions });
    };

    const toggleOptionProperty = (index: number, property: 'active' | 'disabled') => {
        const newOptions = [...product.productOptions];
        newOptions[index][property] = !newOptions[index][property];
        setProduct({ ...product, productOptions: newOptions });
    };

    const addOption = () => {
        setProduct({
            ...product,
            productOptions: [
                ...product.productOptions,
                { id: product.productOptions.length + 1, option_name: '', productId: product.id, active: true, disabled: false }
            ]
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = productDetail ? 'update' : 'add';
        const method = productDetail ? 'PUT' : 'POST';
        try {
            const response = await fetch(`http://localhost:5000/api/products/${url}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert(`Product successfully ${productDetail ? 'updated' : 'added'}:`);
            window.location.href = productDetail ? '/list-product' : '/create-product';
        } catch (error) {
            alert('There was a problem with the fetch operation:');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Product successfully deleted:');
            window.location.href = '/list-product';
        } catch (error) {
            alert('There was a problem with the fetch operation:');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            {!productDetail && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <button
                        onClick={() => window.location.href = '/admin'}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600"
                    >
                        Back to Admin
                    </button>
                    <h1 className="text-2xl font-bold">{productDetail ? 'Update Product' : 'Create Product'}</h1>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Type:</label>
                    <select
                        name="product_type"
                        value={product.product_type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    >
                        <option value="Bike">Bike</option>
                        <option value="football">Football</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Active:</label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={product.active}
                        onChange={() => setProduct({ ...product, active: !product.active })}
                        className="mt-1"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Product Options</h3>
                    {product.productOptions && product.productOptions.map((option, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <label className="block text-gray-700">Option Name:</label>
                            <input
                                type="text"
                                name="option_name"
                                value={option.option_name}
                                onChange={(e) => handleOptionChange(index, e)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            />
                            <label className="block text-gray-700 mt-2">Active:</label>
                            <input
                                type="checkbox"
                                name="active"
                                checked={option.active}
                                onChange={() => toggleOptionProperty(index, 'active')}
                                className="mt-1"
                            />
                            <label className="block text-gray-700 mt-2">Disabled:</label>
                            <input
                                type="checkbox"
                                name="disabled"
                                checked={option.disabled}
                                onChange={() => toggleOptionProperty(index, 'disabled')}
                                className="mt-1"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOption}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Add Option
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600"
                >
                    {productDetail ? 'Update Product' : 'Create Product'}
                </button>

                {productDetail && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                    >
                        Delete Product
                    </button>
                )}
            </form>
        </div>
    );
};

export default CreateProduct;
