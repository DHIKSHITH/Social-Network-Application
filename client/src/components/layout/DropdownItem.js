import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { acceptRequest } from "../../actions/profile";
import PropTypes from "prop-types";
import "./Dropdow.css";
import Dropdown from "react-bootstrap/Dropdown";

export const DropdownItem = ({ notification, key }) => {
  return (
    <li className='dropdown'>
      <Dropdown.Item>
        <Link to={`/post/${notification.post}`}>{`${notification.user} ${
          notification.type
        } your ${notification.type === "accepted" ? "request" : "post"}`}</Link>
      </Dropdown.Item>
    </li>
  );
};

const RequestDropdownItem = ({ request, key, acceptRequest }) => {
  return (
    <li className='dropdown'>
      <Dropdown.Item>
        <Link to='/profile'>{`${request.name} sent you a request`}</Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            acceptRequest(request._id);
          }}
        >
          accept
        </button>
      </Dropdown.Item>
    </li>
  );
};

DropdownItem.propTypes = {};

export default connect(null, { acceptRequest })(RequestDropdownItem);
