import React from 'react';


const Card = ({ width, height, children }) => {
  return (
    <div className="card" style={{ width: width || '100%', height: height || '100%' }}>
      <div className="card-content">
        {children}
      </div>

    </div>
  );
};

export default Card;
