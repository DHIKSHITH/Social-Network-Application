import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownItem = ({ notification, key }) => {
  return (
    <li style={{ backgroundColor: "#17a2b8" }}>
      <Dropdown.Item>
        <Link
          style={{ color: "black" }}
          to={`/post/${notification.post}`}
        >{`${notification.user} ${notification.type} your post`}</Link>
      </Dropdown.Item>
    </li>
  );
};

DropdownItem.propTypes = {};

export default DropdownItem;
