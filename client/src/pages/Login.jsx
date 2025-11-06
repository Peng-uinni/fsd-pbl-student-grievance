// src/pages/Login.js
import React, { useState } from 'react';
import Card from '../components/Card';

const Login = () => {
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${userType}:`, { email, password });
    // In a real app, this would be an API call and redirect
    alert(`Logged in as ${userType}. Redirecting to dashboard... (Check console for data)`);
  };

  return (
    <main>
      <Card title="Login">
        {/* User Type Switch */}
        <div style={{ display: 'flex', marginBottom: '20px', border: '1px solid var(--primary-color)', borderRadius: '4px' }}>
          <button
            onClick={() => setUserType('student')}
            style={{
              flexGrow: 1,
              backgroundColor: userType === 'student' ? 'var(--primary-color)' : 'var(--white)',
              color: userType === 'student' ? 'var(--white)' : 'var(--primary-color)',
              border: 'none',
              borderRadius: '3px 0 0 3px',
              padding: '10px',
              transition: 'all 0.3s',
            }}
          >
            Student Login
          </button>
          <button
            onClick={() => setUserType('admin')}
            style={{
              flexGrow: 1,
              backgroundColor: userType === 'admin' ? 'var(--primary-color)' : 'var(--white)',
              color: userType === 'admin' ? 'var(--white)' : 'var(--primary-color)',
              border: 'none',
              borderRadius: '0 3px 3px 0',
              padding: '10px',
              transition: 'all 0.3s',
            }}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
            Don't have an account? Sign Up
          </a>
        </p>
      </Card>
    </main>
  );
};

export default Login;