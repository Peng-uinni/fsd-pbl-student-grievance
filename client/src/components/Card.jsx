// src/components/Card.js
import React from 'react';

const Card = ({ title, children, style }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full mx-auto">
      {title && <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;