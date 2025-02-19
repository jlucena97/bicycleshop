import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const navigate = useNavigate();

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    const buttons = [
        { label: 'Create Bicycle', path: '/create-bicycle' },
        { label: 'Bicycles Page', path: '/list-bicycle-page' },
        { label: 'Create Product', path: '/create-product' },
        { label: 'Products Page', path: '/list-product' },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Panel</h1>
            <div className="grid grid-cols-1 gap-6">
                {buttons.map((button, index) => (
                <button
                    key={index}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                    onClick={() => handleRedirect(button.path)}
                >
                    {button.label}
                </button>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Admin;
