import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofStudy, from, to },
}) => (
  <div>
    <h3 class="text-dark">{school}</h3>
    <p>
      {" "}
      <Moment format="YYYY/MM/DD"> {from}</Moment> -{" "}
      {to === null ? " Now" : <Moment format="YYYY/MM/DD"> {to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong>
      {degree}
    </p>
    <p>
      <strong>Field of Study: </strong>
      {fieldofStudy}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
