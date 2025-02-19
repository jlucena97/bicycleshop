import { BicycleDetailProps } from '../../types/bicycle';
import { useState } from 'react';
import React from 'react';

const BicycleDetail: React.FC<BicycleDetailProps> = ({ bicycleDetailInterface }) => {
  const [error, setError] = useState<string | null>(null);
  const productType = bicycleDetailInterface?.productDetail[0]?.product_type ?? '';
  const userId = parseInt(localStorage.getItem('isLoggedIn') || '0', 10);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(() =>
    bicycleDetailInterface?.productDetail.reduce((acc, info) => {
      acc[info.product_name] = info.productOptions[0]?.option_name || '';
      return acc;
    }, {} as { [key: string]: string }) || {}
  );

  const handleSelectChange = (productName: string, optionName: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [productName]: optionName,
    }));
    checkRules(productName, optionName);
  };

  const checkRules = (productName: string, optionName: string) => {
    if (productName === 'wheels') {
      undisableAllOptions();
      if(optionName === 'mountain wheels') {
        const frameTypeOptions = bicycleDetailInterface?.productDetail.find(
          (info) => info.product_name === 'frame_type'
        )?.productOptions;

        if (frameTypeOptions) {
          frameTypeOptions.forEach((option) => {
            if (option.option_name === 'diamond' || option.option_name === 'step-through') {
              option.disabled = true;
            }
            if (option.option_name === 'Full-suspension') {
              setSelectedOptions((prevOptions) => ({
                ...prevOptions,
                frame_type: 'Full-suspension',
              }));
            }
          });
        }
      } else if (optionName === 'fat bike wheels') {
          const rimColorTypeOptions = bicycleDetailInterface?.productDetail.find(
            (info) => info.product_name === 'rim_color'
          )?.productOptions;

          if (rimColorTypeOptions) {
            rimColorTypeOptions.forEach((option) => {
              if (option.option_name === 'Red') option.disabled = true;
              if (selectedOptions.rim_color === 'Red') {
                if (option.option_name !== 'Red') {
                  setSelectedOptions((prevOptions) => ({
                    ...prevOptions,
                    rim_color: option.option_name,
                  }));
                }
              }
          });
        }
      }
    }
  }

  const undisableAllOptions = () => {
    bicycleDetailInterface?.productDetail.forEach((info) => {
      info.productOptions.forEach((option) => {
        option.disabled = false;
      });
    });
  };

  const handleAddToCart = async () => {

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchase_id: bicycleDetailInterface?.id,
          user_id: userId,
          sport_type: productType,
          purchase_options: selectedOptions,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Added to cart successfully');
      window.location.href = '/'; // Redirect to home page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Bicycle Detail</h1>
      <h2 className="text-2xl mb-4 text-blue-700">{bicycleDetailInterface?.name}</h2>
      <p className="mb-4 text-green-700">Price: ${bicycleDetailInterface?.price}</p>
      <h3 className="text-xl font-semibold mb-4">Bicycle Parts</h3>
      <div className="grid grid-cols-3 gap-6">
        {bicycleDetailInterface?.productDetail.map((info, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <div className="font-semibold">{info.product_name}</div>
            <div>
              <select
                className="p-2 border rounded w-full mt-2"
                value={selectedOptions[info.product_name] || ''}
                onChange={(e) => handleSelectChange(info.product_name, e.target.value)}
              >
                {info.productOptions.length ? (
                  info.productOptions.map((option) => (
                    <option key={option.id} value={option.option_name} disabled={option.disabled}>
                      {option.option_name}
                    </option>
                  ))
                ) : (
                  <option value="">No options available</option>
                )}
              </select>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default BicycleDetail;
