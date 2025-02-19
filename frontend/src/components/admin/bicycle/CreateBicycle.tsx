import React, { useState, useEffect } from 'react';
import { BicycleDetailProps, BicycleDetailInterface} from '../../../types/bicycle';
import { ProductDetail, ProductOption } from '../../../types/products';

const CreateBicycle: React.FC<BicycleDetailProps> = ({ bicycleDetailInterface }) => {
    const productType = 'Bike';
    const [productData, setProductData] = useState<ProductDetail[]>([]);
    const [name, setName] = useState(bicycleDetailInterface?.name || '');
    const [price, setPrice] = useState(bicycleDetailInterface?.price.toString() || '');
    const [sold, setSold] = useState(bicycleDetailInterface?.sold || false);
    const bicycleDetails = bicycleDetailInterface || null;

    useEffect(() => {
        const fetchBikeProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productType}`);
                const data = await response.json();
                const products: ProductDetail[] = data.products;
                const updatedProductData = await Promise.all(products.map(async (product) => {
                    const options = await fetchProductOptions(product.id);
                    return { ...product, productOptions: options };
                }));
                syncProductData(updatedProductData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBikeProducts();
    }, [productType]);

    const fetchProductOptions = async (productId: number): Promise<ProductOption[]> => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}/options`);
            const data = await response.json();
            return data.options;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const syncProductData = (products: ProductDetail[]) => {
        const updatedProductData = products.map(pd => {
            const productDetail = bicycleDetails?.productDetail.find(detail => detail.id === pd.id);
            const isActive = !!productDetail;
            const updatedOptions = pd.productOptions.map(option => {
                const isOptionActive = productDetail?.productOptions.some(opt => opt.id === option.id) || false;
                return { ...option, active: isOptionActive };
            });
            return { ...pd, active: isActive, productOptions: updatedOptions };
        });
        setProductData(updatedProductData);
    };

    const saveBicycle = async (bicycle: BicycleDetailInterface) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bicycles/${bicycleDetailInterface ? 'update' : 'add'}`, {
                method: bicycleDetailInterface ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bicycle),
            });
            if (!response.ok) {
                throw new Error(`Failed to ${bicycleDetailInterface ? 'update' : 'add'} bicycle`);
            }
            const result = await response.json();
            alert(`Bicycle ${bicycleDetailInterface ? 'updated' : 'added'} successfully: ` + JSON.stringify(result));
            window.location.href = bicycleDetailInterface ? '/list-bicycle-page' : '/create-bicycle';
        } catch (error) {
            alert(`Error ${bicycleDetailInterface ? 'updating' : 'adding'} bicycle: ` + error);
        }
    };

    const deleteBicycle = async (bicycle: BicycleDetailInterface) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bicycles/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bicycle),
            });
            if (!response.ok) {
                throw new Error('Failed to delete bicycle');
            }
            alert('Bicycle deleted successfully');
            window.location.href = '/list-bicycle-page';
        } catch (error) {
            alert('Error deleting bicycle: ' + error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bicycle: BicycleDetailInterface = {
            id: bicycleDetailInterface?.id || 0,
            name,
            price: parseFloat(price),
            sold,
            productDetail: productData,
        };
        saveBicycle(bicycle);
    };

    const handleOptionChange = (productIndex: number, optionIndex: number, checked: boolean) => {
        const updatedProductData = [...productData];
        updatedProductData[productIndex].productOptions[optionIndex].active = checked;
        setProductData(updatedProductData);
    };

    const handleDelete = async () => {
        if (!bicycleDetails) {
            alert('No bicycle selected to delete');
            return;
        }
        deleteBicycle(bicycleDetails);
    };

    const handleProductChange = (index: number, checked: boolean) => {
        const updatedProductData = [...productData];
        updatedProductData[index].active = checked;
        updatedProductData[index].productOptions.forEach(option => option.active = checked);
        setProductData(updatedProductData);
    };

    const handleBack = () => {
        window.location.href = bicycleDetails ? '/list-bicycle-page' : '/admin';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
            <button onClick={handleBack} className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 text-sm">
                Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{bicycleDetails ? 'Update Bicycle' : 'Create Bicycle'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Name:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">Price:</label>
                <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {bicycleDetails && (
                <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={sold}
                    onChange={(e) => setSold(e.target.checked)}
                    className="mr-2"
                />
                <label className="font-semibold text-gray-700">Sold</label>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productData.map((data, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
                    <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={data.active || false}
                        onChange={(e) => handleProductChange(index, e.target.checked)}
                        className="mr-2"
                    />
                    <strong className="text-gray-700">Product:</strong> {data.product_name} - {data.price}
                    </div>
                    <ul className="ml-6 list-disc">
                    {data.productOptions.map((option, idx) => (
                        <li key={idx} className="flex items-center mb-1">
                        <input
                            type="checkbox"
                            checked={option.active || false}
                            onChange={(e) => handleOptionChange(index, idx, e.target.checked)}
                            className="mr-2"
                        />
                        <strong className="text-gray-700">Option:</strong> {option.option_name}
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                {bicycleDetails && (
                <button type="button" onClick={handleDelete} className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                    Delete Bicycle
                </button>
                )}
                <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                {bicycleDetails ? 'Update Bicycle' : 'Create Bicycle'}
                </button>
            </div>
            </form>
        </div>
    );
};

export default CreateBicycle;
