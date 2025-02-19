import React, { useState, useEffect } from 'react';
import { Bicycle, BicycleDetailInterface, ListBicyclePageState } from '../../../types/bicycle';
import BicycleList from '../../bicycle/BicycleList';
import CreateBicycle from './CreateBicycle';

const ListBicyclePage: React.FC = () => {
    const [state, setState] = useState<ListBicyclePageState>({
        bicycles: [],
        selectedBike: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        fetchBicycles();
    }, []);

    const fetchBicycles = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bicycles/admin');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data: Bicycle[] = await response.json();
            setState(prevState => ({ ...prevState, bicycles: data }));
        } catch (err) {
            setState(prevState => ({ ...prevState, error: err instanceof Error ? err.message : 'Unknown error occurred' }));
        } finally {
            setState(prevState => ({ ...prevState, loading: false }));
        }
    };

    const handleSelectBike = async (id: number) => {
        try {
            console.log('fetching bike with id:', id);
            setState(prevState => ({ ...prevState, loading: true }));
            const response = await fetch(`http://localhost:5000/api/bicycles/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data: BicycleDetailInterface = await response.json();
            setState(prevState => ({ ...prevState, selectedBike: data }));
        } catch (err) {
            setState(prevState => ({ ...prevState, error: err instanceof Error ? err.message : 'Unknown error occurred' }));
        } finally {
            setState(prevState => ({ ...prevState, loading: false }));
        }
    };

    const { bicycles, selectedBike, loading, error } = state;

    if (loading) return <div className="text-center text-gray-500">Loading bicycles...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Bicycle Page</h1>
            {!selectedBike && (
                <div className="content-wrapper bg-white p-6 rounded-lg shadow-lg">
                <BicycleList bicycles={bicycles} onSelectBike={handleSelectBike} isAdmin={true} />
                </div>
            )}
            {selectedBike && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                <CreateBicycle bicycleDetailInterface={selectedBike} />
                </div>
            )}
            </div>
        </div>
    );
};

export default ListBicyclePage;
