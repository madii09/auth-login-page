import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './login.scss';

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
      <form onSubmit={handleLogin} className='form'>
        <h2>Login</h2>

        <div className='form-group'>
          <label htmlFor='login'>Your login</label>
          <input
            type='text'
            id='login'
            placeholder='Login'
            value={login}
            required
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Your password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* <div className='checkbox-group'>
          <input type='checkbox' id='remember' required />
          <label htmlFor='remember'>Remember me</label>
        </div> */}

        <button type='submit'>Login</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
