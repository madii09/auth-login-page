import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    fetch('https://back.ifly.com.uz/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        console.log();
        if (item?.success) {
          toast.success(item?.data?.message);
          localStorage.setItem('accesstokenn', item?.data?.access_token);
          localStorage.setItem('refreshtokenn', item?.data?.refresh_token);
          navigate('/home');
        } else {
          toast.error(item?.message?.message);
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('accesstokenn');

    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          placeholder='login'
          value={login}
          required
          onChange={(e) => setLogin(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
        <button type='submit' style={{ width: '100%', padding: '10px' }}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
