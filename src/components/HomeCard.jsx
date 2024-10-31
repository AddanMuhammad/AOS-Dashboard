import React from 'react';
import PropTypes from 'prop-types';

const HomeCard = ({ cardsData, cardHeight, cardWidth }) => {
  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="ag-courses_item"
            style={{
              height: cardHeight,
              width: cardWidth,
            }}
          >
            <div className="ag-courses-item_link">
              <div
                className="ag-courses-item_bg"
                style={{ backgroundColor: card.bgColor }}
              ></div>
              <div className="ag-courses-item_title">{card.title}</div>
              <div className="ag-courses-item_date-box">
                Total: <span className="ag-courses-item_date">{card.startDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// PropTypes validation
HomeCard.propTypes = {
  cardSize: PropTypes.string,
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,

      bgColor: PropTypes.string.isRequired,
    })
  ),
};

export default HomeCard;
