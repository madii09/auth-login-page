import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.removeItem('accesstokenn');
    localStorage.removeItem('refreshtokenn');
    navigate('/', { replace: true });
  };

  return (
    <nav
      style={{
        padding: '10px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <button
        onClick={logoutFunction}
        style={{
          padding: '8px 16px',
          backgroundColor: '#e7000b',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
