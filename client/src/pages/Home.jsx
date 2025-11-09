// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  // const { isAuthenticated, role } = useAuth();

  return (
    <main>
      <Card title="Welcome to GrievanceSite">
        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Your platform for submitting and tracking institutional complaints and feedback.
        </p>

        {/* {!isAuthenticated ? ( */}
          <>
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
          </>
        {/* ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>You're logged in.</p>
            <Link to={role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} className="button">
              Go to Dashboard
            </Link>
          </div>
        )} */}
      </Card>
    </main>
  );
};

export default Home;