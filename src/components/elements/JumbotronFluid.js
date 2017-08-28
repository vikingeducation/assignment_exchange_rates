import React from "react";

const JumbotronFluid = ({ heading, lead }) =>
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1>
        {heading}
      </h1>
      <p className="lead">
        {lead}
      </p>
    </div>
  </div>;

export default JumbotronFluid;
