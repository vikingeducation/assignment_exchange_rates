import React, {Component} from "react";
import {Button} from "react-bootstrap";

const ButtonInstance = ({text, type, onClick, value}) => {
  return (
    <Button type={type} bsStyle="primary" onClick={onClick} value={value}>
      {text}
    </Button>
  );
};

export default ButtonInstance;
