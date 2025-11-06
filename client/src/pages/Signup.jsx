// src/pages/Signup.js
import React, { useState } from 'react';
import Card from '../components/Card';

const Signup = () => {
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signing up as ${userType}:`, { name, email, password });
    // Note: Admins shouldn't typically self-sign-up, but for this project's scope, we'll allow it.
    alert(`Signed up as ${userType}. Redirecting to login... (Check console for data)`);
  };

  return (
    <main>
      <Card title="Sign Up">
        {/* User Type Switch - Same style as Login */}
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
            Student Signup
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
            Admin Signup
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '10px' }}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
            Already have an account? Login
          </a>
        </p>
      </Card>
    </main>
  );
};

export default Signup;