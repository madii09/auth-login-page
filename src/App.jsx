import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Category from './pages/Category/Category';
import Discount from './pages/Discount/Discount';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Sizes from './pages/Sizes/Sizes';
import Colors from './pages/Colors/Colors';
import FAq from './pages/Faq/FAq';
import Team from './pages/Team/Team';
import News from './pages/News/News';
import Contact from './pages/Contact/Contact';

const App = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('accesstokenn');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/category' element={<Category />} />
          <Route path='/discount' element={<Discount />} />
          <Route path='/sizes' element={<Sizes />} />
          <Route path='/colors' element={<Colors />} />
          <Route path='/faq' element={<FAq />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/team' element={<Team />} />
          <Route path='/news' element={<News />} />
        </Route>
        <Route />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
