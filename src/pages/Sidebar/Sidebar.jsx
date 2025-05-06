import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './sidebar.css';
import '../../styles/global.scss';

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
        width: '220px',
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
          onClick={() => handleNavigate('products')}
          className='menu-item'
          style={{
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            margin: '5px auto',
            textAlign: 'center',
            backgroundColor: isActive('products') ? '#00a63e' : 'transparent',
            color: isActive('category') ? '#fff' : '#fff',
          }}
        >
          Products
        </li>
        <li
          onClick={() => handleNavigate('category')}
          className='menu-item'
          style={{
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            margin: '10px auto',
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
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
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
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
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
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isActive('colors') ? '#00a63e' : 'transparent',
            color: isActive('colors') ? '#fff' : '#fff',
          }}
        >
          Colors
        </li>
        <li
          onClick={() => handleNavigate('faq')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isActive('faq') ? '#00a63e' : 'transparent',
            color: isActive('faq') ? '#fff' : '#fff',
          }}
        >
          Faq
        </li>
        <li
          onClick={() => handleNavigate('contact')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isActive('contact') ? '#00a63e' : 'transparent',
            color: isActive('contact') ? '#fff' : '#fff',
          }}
        >
          Contact
        </li>
        <li
          onClick={() => handleNavigate('team')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isActive('team') ? '#00a63e' : 'transparent',
            color: isActive('team') ? '#fff' : '#fff',
          }}
        >
          Team
        </li>
        <li
          onClick={() => handleNavigate('news')}
          style={{
            padding: '10px',
            cursor: 'pointer',
            margin: '10px auto',
            textAlign: 'center',
            borderRadius: '5px',
            backgroundColor: isActive('news') ? '#00a63e' : 'transparent',
            color: isActive('news') ? '#fff' : '#fff',
          }}
        >
          News
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
