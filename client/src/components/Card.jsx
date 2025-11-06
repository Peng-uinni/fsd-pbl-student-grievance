// src/components/Card.js
import React from 'react';

const Card = ({ title, children, style }) => {
  return (
    <div style={{
      backgroundColor: 'var(--white)',
      padding: '30px',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow)',
      maxWidth: '500px',
      width: '100%',
      margin: '20px 0',
      ...style,
    }}>
      {title && <h2 style={{ marginBottom: '20px', textAlign: 'center', color: 'var(--primary-color)' }}>{title}</h2>}
      {children}
    </div>
  );
};

export default Card;