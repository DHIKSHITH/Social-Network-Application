import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Dropdow.css";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownItem = ({ notification, key }) => {
  return (
    <li className="dropdown">
      <Dropdown.Item>
        <Link
          to={`/post/${notification.post}`}
        >{`${notification.user} ${notification.type} your post`}</Link>
      </Dropdown.Item>
    </li>
  );
};

DropdownItem.propTypes = {};

export default DropdownItem;
