import React from 'react';
import { ErrorProps } from '../../types/error';

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-lg text-gray-800">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;