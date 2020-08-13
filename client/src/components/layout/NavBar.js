import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Dropdow.css";
import { logout } from "../../actions/auth";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "./DropdownItem";

const NavBar = ({
  auth: { isAuthenticated, loading },
  profile: { profile },
  logout,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide=sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">Notification</Dropdown.Toggle>

          <Dropdown.Menu>
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {!loading &&
                profile !== null &&
                profile.notification.map((noti) => (
                  <DropdownItem key={noti._id} notification={noti} />
                ))}
            </ul>
          </Dropdown.Menu>
          <span>
            {!loading &&
              profile !== null &&
              profile.notification.length > 0 && (
                <span className="noti-num">{profile.notification.length}</span>
              )}
          </span>
        </Dropdown>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide=sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(NavBar);
