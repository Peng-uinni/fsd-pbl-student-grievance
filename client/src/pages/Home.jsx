// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
  return (
    <main>
      <Card title="Welcome to GrievanceSite">
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Your platform for submitting and tracking institutional complaints and feedback.
        </p>
        <p style={{ marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
          Please log in or sign up to continue.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to="/login" className="button" style={{ textDecoration: 'none' }}>
            Login
          </Link>
          <Link to="/signup" className="button" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>
      </Card>
    </main>
  );
};

export default Home;