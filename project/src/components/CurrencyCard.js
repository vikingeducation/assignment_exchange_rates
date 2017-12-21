import React, { Component } from 'react';

const CurrencyCard = ({ currency }) => {
  return (
    <div>
      <ul>
        <li>{currency}</li>
      </ul>
    </div>
  );
};

export default CurrencyCard;
