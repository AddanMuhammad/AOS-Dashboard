
// import React from 'react';


// const Card = ({ title, content, image, onClick, children, style }) => {
//   return (
//     <div className="card" onClick={onClick} style={style}>
//       {image && <img src={image} alt={title} className="card-image" />}
//       {title && <h3 className="card-title">{title}</h3>}
//       {content && <p className="card-content">{content}</p>}
//       {children}
//     </div>
//   );
// };

// export default Card;



// Card.js
import React from 'react';


const Card = ({ width, height, backgroundColor, children }) => {
  const cardStyle = {
    width: width || '300px',
    height: height || '200px',
    backgroundColor: backgroundColor || '#fff',
  };

  return (
    <div className="card" style={cardStyle}>
      {children}
    </div>
  );
};

export default Card;
