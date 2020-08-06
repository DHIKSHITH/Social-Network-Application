import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onchange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    // if (password !== passwordConfirm) {
    //   console.log("password do not match");
    // } else {
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
  };

  return (
    <Fragment>
      <div className="alert alert-danger">Invalid credentials</div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form
        className="form"
        action="dashboard.html"
        onSubmit={(e) => onsubmit(e)}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onchange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
