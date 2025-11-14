import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const {isAuthenticated, logout, role} = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        {/* Show dashboard link when authenticated, otherwise Login */}
        {isAuthenticated ? (
          <>
            <Link to={role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} style={{ color: 'var(--white)', marginLeft: '15px', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={{ marginLeft: '12px', background: 'transparent', color: 'var(--white)', border: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'var(--white)', marginLeft: '15px', textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;