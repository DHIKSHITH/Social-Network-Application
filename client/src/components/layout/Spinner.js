import React, { Fragment } from "react";
import Loading from "react-bootstrap/Spinner";

export const Spinner = () => (
  <Fragment>
    <Loading animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Loading>
  </Fragment>
);
