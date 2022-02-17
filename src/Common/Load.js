import React from "react";

function Load({ container }) {
  const internal = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  return container ? (
    <div className={"row"}>
      <div className={"col-12"}>{internal}</div>
    </div>
  ) : (
    internal
  );
}

export default Load;