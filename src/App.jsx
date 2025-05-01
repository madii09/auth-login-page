import React, {useEffect, useMemo} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Category from './pages/Category';
import Discount from './pages/Discount';
import Layout from './layout/Layout';

const App = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('accesstokenn');

  useEffect(() => {
    if(!token) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/discount' element={<Discount />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
