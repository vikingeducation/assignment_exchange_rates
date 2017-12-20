import React from "react";
import Rate from './Rate'

const ExchangeRates = ({ rates }) => {

  let allRates = {for (let k in rates) {
  <Rate currency={k}  value={rates[k]}
  }}



  return (<ul>
    {for (var k in rates){
      <li> {k}:{rates[k]} </li>
    }
    }
  </ul>
)
};


export default ExchangeRates;
