import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  // const { isAuthenticated, role } = useAuth();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card>
         <h1 className="text-3xl font-bold text-center text-blue-700 mb-3">
          Welcome to GrievanceSite </h1>
        <p className= "mb-5 text-center text-gray-500">
          Your platform for submitting and tracking institutional complaints and feedback.
        </p>

        {/* {!isAuthenticated ? ( */}
          <>
            <p className="mb-8 text-center font-semibold text-gray-800">
              To continue, Login or SignUp!
            </p>

            <div className='flex justify-center gap-5'>
              <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition-all">
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