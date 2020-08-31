import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import { Fragment } from "react";
import { Spinner } from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");

  useEffect(() => {
    getProfiles(currentPage, value);
  }, [getProfiles, currentPage, value]);
  const onPreclickHandler = () => {
    if (currentPage === 1) {
      return null;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const onNextClickHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Profiles</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            others
          </p>
          <form class='search'>
            <input
              type='text'
              class='search__input'
              placeholder='Search by Full Name'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
          {/* <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Please enter the first name"
          ></input> */}
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>no profiles found</h4>
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onPreclickHandler}
              style={{
                padding: ".5rem",
                backgroundColor: "#17a2b8",
                color: "#fff",
                border: "none",
                marginRight: "1rem",
                width: "5rem",
              }}
            >
              previous
            </button>
            <button
              onClick={onNextClickHandler}
              style={{
                padding: ".5rem",
                backgroundColor: "#17a2b8",
                color: "#fff",
                border: "none",
                width: "5rem",
              }}
            >
              next
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
