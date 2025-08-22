import React from 'react';

const GlassContainer = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`
        bg-white bg-opacity-10 
        backdrop-filter backdrop-blur-2xl
        border border-white border-opacity-20
        rounded-2xl
        shadow-2xl
        p-8
        ${className}
      `}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassContainer;
