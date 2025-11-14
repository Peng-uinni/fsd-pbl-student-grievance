import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentComplaints from './pages/StudentComplaints';
import ComplaintForm from './components/ComplaintForm';
import AllComplaints from './pages/AllComplaints';

import AuthProvider from './context/AuthContext';
import ComplaintPage from './pages/ComplaintPage';

// Simple Not Found Page
const NotFound = () => (
    <main style={{ textAlign: 'center' }}>
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/" style={{ color: 'var(--primary-color)' }}>Go to Home</a>
    </main>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/file-complaint" element={<ComplaintForm />} />
          <Route path="/my-complaints" element={<StudentComplaints />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/all-complaints" element={<AllComplaints />} />

          {/* Complaint Pages */}
          <Route path="/complaint/:complaintId" element={<ComplaintPage/>}/>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;