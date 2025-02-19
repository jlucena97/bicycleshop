import React, { useState, useEffect } from 'react';
import { BicycleDetailInterface, Bicycle } from '../../types/bicycle';
import BicycleDetail from './BicycleDetail';
import BicycleList from './BicycleList';

const BicyclePage: React.FC = () => {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [selectedBike, setSelectedBike] = useState<BicycleDetailInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bicycles/user');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: Bicycle[] = await response.json();
        setBicycles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBicycles();
  }, []);

  const handleSelectBike = async (id: number) => {
    try {
      console.log('fetching bike with id:', id);
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/bicycles/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: BicycleDetailInterface = await response.json();
      setSelectedBike(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading bicycles...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-6 text-white text-center">Marcus's Bicycle Shop</h1>
      {selectedBike &&  
      <button 
      className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded mb-6 transition duration-300 ease-in-out transform hover:scale-105"
      onClick={() => setSelectedBike(null)}>
      {'Back to bike list'}
      </button>}
      {!selectedBike && (
      <div className="content-wrapper bg-white p-6 rounded-lg shadow-2xl w-full max-w-4xl">
        <BicycleList bicycles={bicycles} onSelectBike={handleSelectBike} isAdmin={false}/>
      </div>
      )}
      {selectedBike && <BicycleDetail bicycleDetailInterface={selectedBike} />}
    </div>
  );
}

export default BicyclePage;
