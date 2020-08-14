import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, job, location, current, to, from, jobdesc },
}) => (
  <div>
    <h3 class="text-dark">{company}</h3>
    <p>
      {" "}
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {to === null ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong>
      {job}
    </p>
    <p>
      <strong>Description: </strong>
      {jobdesc}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
