import React from 'react';
import PropTypes from 'prop-types';

const InfoSection = props => {
  const { title, children, cardClass } = props;

  return (
    <div className="InfoSection">
      <div className={"card " + cardClass || ''}>
        <div className="card-block">
          <h3 className="card-title text-center">{title}</h3>
          <div className="card-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cardClass: PropTypes.string
};

export default InfoSection;







