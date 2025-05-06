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
      <h2>Login</h2>
      <form onSubmit={handleLogin} class='max-w-sm mx-auto'>
        <div className='mb-5'>
          <label
            htmlFor='login'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your login
          </label>
          <input
            type='text'
            placeholder='login'
            value={login}
            required
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your password
          </label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex items-start mb-5'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              class='w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Remember me
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
