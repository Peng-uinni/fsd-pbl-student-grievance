// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      backgroundColor: 'var(--primary-color)',
      color: 'var(--white)',
      padding: '15px 20px',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none' }}>
          GrievanceSite
        </Link>
      </h1>
      <nav>
        {/* Placeholder navigation - actual navigation will be in pages/dashboards */}
        <Link to="/login" style={{ color: 'var(--white)', marginLeft: '15px', textDecoration: 'none' }}>
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;