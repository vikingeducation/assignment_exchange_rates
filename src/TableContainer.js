import React from "react";
import Table from "./Table";

const TableContainer = ({ tableData }) => {
  if (!tableData.length) return null;

  return (
    <div className="row">
      {tableData.map(data =>
        <div key={`${data.base}${data.date}`} className={`col-xs-4`}>
          <Table {...data} />
        </div>
      )}
    </div>
  );
};

export default TableContainer;
