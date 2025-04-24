import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://your-api.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type='submit' style={{ width: '100%', padding: '10px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
