import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar style={{ width: '250px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
