import React from "react";
import Table from "./Table";

const TableContainer = ({ tableData }) => {
  if (!tableData.length) return null;

  const offset = tableData.length === 1 ? 4 : 0;

  return (
    <div className="row">
      {tableData.map(data =>
        <div key={data.date} className={`col-xs-4 col-xs-offset-${offset}`}>
          <Table {...data} />
        </div>
      )}
    </div>
  );
};

export default TableContainer;
