import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import BicyclePage from './components/bicycle/BicyclePage';
import Menu from './components/menu/Menu';
import Admin from './components/admin/Admin';
import UserCart from './components/user/UserCart';
import CreateBicycle from './components/admin/bicycle/CreateBicycle';
import ListBicyclePage from './components/admin/bicycle/ListBicyclePage';
import CreateProduct from './components/admin/product/CreateProduct';
import ListProductPage from './components/admin/product/ListProductPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') !== null;
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (id: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', id);
  };

  return (
    <div>
      {isLoggedIn ? (
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/user-cart" element={<UserCart />} />
            <Route path="/" element={<BicyclePage />} />
            <Route path="/create-bicycle" element={<CreateBicycle />} />
            <Route path="/list-bicycle-page" element={<ListBicyclePage />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/list-product" element={<ListProductPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;