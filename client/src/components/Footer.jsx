// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--text-color)',
      color: 'var(--white)',
      textAlign: 'center',
      padding: '10px 20px',
      marginTop: 'auto',
    }}>
      <p>&copy; {new Date().getFullYear()} GrievanceSite. All rights reserved.</p>
    </footer>
  );
};

export default Footer;