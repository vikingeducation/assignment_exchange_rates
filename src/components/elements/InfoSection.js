import React from 'react';

const InfoSection = props => {
  const { title, col, children } = props;

  return (
    <div className={"InfoSection col-md-" + col}>
      <div className="card">
        <div className="card-block">
          <h3 className="card-title text-center"><u>{title}</u></h3>
          <div className="card-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;







