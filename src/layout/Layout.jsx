import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
  return (
    <div className='layout_container' style={{ display: 'flex' }}>
      <Sidebar style={{ width: '250px' }} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
