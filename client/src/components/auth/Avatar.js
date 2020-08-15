import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { register } from "../../actions/auth";

const Avatar = ({ register, payload: { payload }, isAuthenticated }) => {
  const [avatar, setavatar] = useState("");
  const [payloadData, setPayload] = useState({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    passwordConfirm: payload.passwordConfirm,
  });
  const name = payloadData.name;
  const email = payloadData.email;
  const password = payloadData.password;
  const passwordConfirm = payloadData.passwordConfirm;

  useEffect(() => {
    if (avatar === "") {
      return;
    } else if (avatar === "skip") {
      register({ name, email, password, passwordConfirm });
    } else {
      console.log(avatar);
      register({ name, email, avatar, password, passwordConfirm });
    }
  }, [avatar]);

  const onClick = (e) => {
    setavatar(e.target.src);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <img
        src="https://cdn2.vectorstock.com/i/1000x1000/17/61/male-avatar-profile-picture-vector-10211761.jpg"
        alt="avatar"
        onClick={(e) => onClick(e)}
      ></img>
      <img
        src="https://www.kindpng.com/picc/m/24-248442_female-user-avatar-woman-profile-member-user-profile.png"
        alt="avatar"
        onClick={(e) => onClick(e)}
      ></img>
      <img
        src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
        alt="avatar"
        onClick={(e) => onClick(e)}
      ></img>
      <img
        src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/128009228/original/8e8ad34b012b46ebd403bd4157f8fef6bb2c076b/design-minimalist-flat-cartoon-caricature-avatar-in-6-hours.jpg"
        alt="avatar"
        onClick={(e) => onClick(e)}
      ></img>
    </div>
  );
};

Avatar.propTypes = {};
const mapStateToProps = (state) => ({
  payload: state.avatarRegister,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Avatar);
