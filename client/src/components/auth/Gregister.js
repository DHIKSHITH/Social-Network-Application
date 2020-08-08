import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Gregister = ({ register, setAlert, payload, isAuthenticated }) => {
  const [data, setdata] = useState({
    password: "",
    passwordConfirm: "",
  });
  const { password, passwordConfirm } = data;
  const onchange = (e) => setdata({ ...data, [e.target.name]: e.target.value });
  //   const { payload } = payload;
  console.log(payload);
  const name = payload.payload.gname;
  const email = payload.payload.gemail;

  const onsubmit = (e) => {
    console.log(password);
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert("password not match", "danger");
    } else {
      register({ name, email, password, passwordConfirm });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Create a Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Hello hi {name}.Please create a password
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onsubmit(e)}
      >
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onchange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => onchange(e)}
            name="passwordConfirm"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </Fragment>
  );
};
Gregister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payload: state.gregister,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register, setAlert })(Gregister);
