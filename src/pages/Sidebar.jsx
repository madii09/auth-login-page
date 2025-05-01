import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (section) => {
    navigate(`/${section}`);
  };

  const isActive = (section) => location.pathname === `/${section}`;

  return (
    <aside
      style={{
        backgroundColor: '#1e2939',
        color: '#fff',
        padding: '20px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        alignItems: 'center',
      }}
    >
      <img
        src={logo}
        alt='Logo'
        style={{ width: '40%', height: 'auto', marginBottom: '20px' }}
      />

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          width: '90%',
        }}
      >
        <li
          onClick={() => handleNavigate('category')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            margin: '20px auto',
            textAlign: 'center',
            backgroundColor: isActive('category') ? '#00a63e' : 'transparent',
            color: isActive('category') ? '#fff' : '#fff',
          }}
        >
          Category
        </li>
        <li
          onClick={() => handleNavigate('discount')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '20px auto',
            textAlign: 'center',
            backgroundColor: isActive('discount') ? '#00a63e' : 'transparent',
            color: isActive('discount') ? '#fff' : '#fff',
          }}
        >
          Discount
        </li>
        <li
          onClick={() => handleNavigate('sizes')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '20px auto',
            textAlign: 'center',
            backgroundColor: isActive('sizes') ? '#00a63e' : 'transparent',
            color: isActive('sizes') ? '#fff' : '#fff',
          }}
        >
          Sizes
        </li>
        <li
          onClick={() => handleNavigate('colors')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '20px auto',
            textAlign: 'center',
            backgroundColor: isActive('colors') ? '#00a63e' : 'transparent',
            color: isActive('colors') ? '#fff' : '#fff',
          }}
        >
          Colors
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
