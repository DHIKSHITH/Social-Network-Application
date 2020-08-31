import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register, Gregister, avatarregister } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

// import axios from "axios";

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  Gregister,
  avatarregister,
}) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarRedirect: false,
  });
  const [googleData, setGoogleData] = useState({
    gname: null,
    gemail: null,
    gurl: null,
    redirect: false,
  });
  useEffect(() => {
    if (googleData.gname === null) {
      return;
    } else {
      Gregister(googleData.gname, googleData.gemail, googleData.gurl);
    }
  }, [googleData, Gregister]);
  const { name, email, password, passwordConfirm } = formData;
  const onchange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert("password not match", "danger");
    } else {
      setformData({ ...formData, avatarRedirect: true });
      avatarregister(name, email, password, passwordConfirm);
      // register({ name, email, password, passwordConfirm });
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
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const Name = profile.getName();
    const ImageURL = profile.getImageUrl();
    const Email = profile.getEmail();
    setGoogleData({
      gname: Name,
      gemail: Email,
      gurl: ImageURL,
      redirect: true,
    });
  }

  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  if (formData.avatarRedirect) {
    return <Redirect to='/avatar' />;
  }
  if (googleData.redirect) {
    return <Redirect to='/password' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={(e) => onsubmit(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            onChange={(e) => onchange(e)}
            value={name}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onchange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onchange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={passwordConfirm}
            onChange={(e) => onchange(e)}
            name='passwordConfirm'
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      <GoogleLogin
        clientId='317821198108-j5a7urpncd2f0bdbiadhv5oe17smpcrd.apps.googleusercontent.com'
        buttonText='Sign up with Google'
        onSuccess={onSignIn}
        cookiePolicy={"single_host_origin"}
      />
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  Gregister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
  Gregister,
  avatarregister,
})(Register);
