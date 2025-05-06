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
          padding: '10px 16px',
          margin: '20px',
          backgroundColor: '#e7000b',
          color: '#fff',
          border: 'none',
          fontSize: '16px',
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
