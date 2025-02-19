import React from 'react';
import { BicycleListProps } from '../../types/bicycle';

const BicycleList: React.FC<BicycleListProps> = ({ bicycles, onSelectBike, isAdmin }) => {
  if (isAdmin) {
    return (
      <div className="admin-list-container p-8 bg-gray-100 rounded-lg shadow-lg border-2 border-gray-300">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900">Admin Bicycle List</h2>
        <ul className="bicycle-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bicycles.map((bike) => (
            <li
              key={bike.id}
              className="admin-list-item p-8 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer bg-white"
              onClick={() => onSelectBike(bike.id)}
            >
              <div className="bike-details">
                <span className="bike-name block text-2xl font-bold text-gray-800 mb-4">{bike.name}</span>
                <span className="bike-price block text-gray-600 mb-2">Price: ${bike.price} €</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="list-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Bicycles</h2>
      <ul className="bicycle-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bicycles.map((bike) => (
          <li
            key={bike.id}
            className="list-item p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => onSelectBike(bike.id)}
          >
            <div className="bike-details">
              <span className="bike-name block text-xl font-semibold text-gray-900 mb-2">{bike.name}</span>
              <span className="bike-price block text-gray-700 mb-1">Price: ${bike.price} €</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BicycleList;
