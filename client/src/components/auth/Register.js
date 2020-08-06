import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import propTypes from "prop-types";

import axios from "axios";

const Register = ({ setAlert }) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = formData;
  const onchange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert("password not match", "danger");
    } else {
      console.log("success");
      //   const newUser = {
      //     name,
      //     email,
      //     password,
      //     passwordConfirm,
      //   };
      //   try {
      //     // const body = JSON.stringify(newUser);
      //     // console.log(body);
      //     const res = await axios.post("/api/v1/user/signup", newUser);
      //     console.log(res.data);
      //   } catch (err) {
      //     console.log(err.response.data);
      //   }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onsubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => onchange(e)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onchange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
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
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: propTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
