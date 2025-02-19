import React, { useEffect, useState } from 'react';
import { Bicycle, UserCartData } from '../../types/bicycle';
import ErrorMessage from '../error/ErrorMessage';


const UserCart: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cartData, setCartData] = useState<UserCartData | null>(null);
    const [total, setTotal] = useState<number>(0);
    const userId = parseInt(localStorage.getItem('isLoggedIn') || '0', 10);

    const fetchCartData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch cart');
            const data = await response.json();
            
            // Improved data formatting with error handling
            const formattedData: UserCartData = {
                user_id: userId,
                bikes: data[userId]?.map((item: any) => ({
                    bike: item.Bike?.[0] || {} as Bicycle,
                    total: item.Bike?.[1] || 0
                })) || []
            };
            
            setCartData(formattedData);

            // Calculate the total price
            const totalPrice = formattedData.bikes.reduce((acc, { bike }) => acc + bike.price, 0);
            setTotal(totalPrice);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const deleteBikeFromCart = async (bikeId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${userId}/${bikeId}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) throw new Error('Failed to delete item');
            
            // Refresh cart data after successful deletion
            await fetchCartData();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Deletion failed');
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []); // Consider adding userId to dependencies if it can change

    if (loading) return <div>Loading...</div>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-4">
            <div className="flex justify-center items-center mb-4">
                <h2 className="text-2xl font-bold">User Cart</h2>
            </div>
            {cartData?.bikes?.length ? (
                <div className="space-y-6">
                    {cartData.bikes.map(({ bike }) => (
                        <div key={bike.id} className="border p-6 rounded-lg shadow-lg bg-white">
                            <h3 className="text-2xl font-semibold text-gray-800">{bike.name}</h3>
                            <p className="text-gray-600 mt-2">Price: ${bike.price}</p>
                            
                            <h4 className="text-lg font-medium mt-4 text-gray-700">Product Info:</h4>
                            <ul className="ml-4 mt-2 p-4 border rounded-lg bg-gray-50">
                                {bike.productInfo?.map((info) => (
                                    <li key={info.product.id} className="p-2 rounded-lg mb-2 bg-white shadow-sm">
                                        <span className="font-medium text-gray-800">
                                            {info.product.product_name}
                                        </span>: {info.productOption.option_name}
                                        <span className="text-gray-600"> (${info.product.price})</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <button
                                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                onClick={() => deleteBikeFromCart(bike.id)}
                            >
                                Discard
                            </button>
                        </div>
                    ))}
                    <p className="font-bold text-xl mt-4 text-gray-800">Total: ${total}</p>
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M9 3v12m6-12v12m-9 6h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Browse our bikes and add them to your cart.</p>
                    <div className="mt-6">
                        <a href="/" className="text-indigo-600 hover:text-indigo-500">
                            Go to Bikes
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCart;