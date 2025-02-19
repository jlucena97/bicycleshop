import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        console.log('Logged out');
        window.location.href = '/';
    };

    return (
        <nav className="bg-[#43B4B4] p-4">
            <ul className="grid grid-cols-2">
            <div className="flex space-x-4">
                <li>
                <Link to="/admin" className="text-white hover:text-gray-400">
                    Admin
                </Link>
                </li>
                <li>
                <Link to="/user-cart" className="text-white hover:text-gray-400">
                    User Cart
                </Link>
                </li>
                <li>
                <Link to="/" className="text-white hover:text-gray-400">
                    Home
                </Link>
                </li>
            </div>
            <div className="flex justify-end">
                <li>
                    <a onClick={handleLogout} className="text-white hover:text-gray-400 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 10v1m0-10V5" />
                        </svg>
                    </a>
                </li>
            </div>
            </ul>
        </nav>
    );
};

export default Menu;
