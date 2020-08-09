const Profile = require("../model/profilemodel");

exports.createprofile = async (req, res, next) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.city) profileFields.city = req.body.city;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.about) profileFields.about = req.body.about;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - Spilt into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    const profile = await Profile.create(profileFields);
    console.log(profile);
    res.status(200).json({
      status: "success",
      profile,
    });
  }
  profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true }
  );
  res.status(200).json({
    status: "updated success",
    profile,
  });
};

exports.getAllProfile = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.status(200).json({
      status: "success",
      data: profiles,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({
        status: "theres no profile with this user",
      });
    }
    res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(400).json({
      status: "fail",
      err: err,
    });
  }
};
exports.getMe = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({
        status: "theres no profile with this user",
      });
    }
    res.status(200).json({
      profile,
    });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(400).json({
      status: "fail",
      err: err,
    });
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({
        msg: "no profile to delete",
      });
    }
    return res.status(200).json({
      status: "successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: err,
    });
  }
};

exports.addExperience = async (req, res, next) => {
  const { job, company, location, from, to, current, jobdesc } = req.body;
  const newExp = { job, company, location, from, to, current, jobdesc };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({
        msg: "there is no profile",
      });
    }
    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).json({
      profile,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err,
    });
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({
      profile,
      msg: "experience deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "server error",
    });
  }
};
exports.addEducation = async (req, res, next) => {
  const { school, degree, fieldOfStudy, from, to, current } = req.body;
  const newEdu = { school, degree, fieldOfStudy, from, to, current };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({
        msg: "there is no profile",
      });
    }
    profile.education.unshift(newEdu);
    await profile.save();
    res.status(200).json({
      profile,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err,
    });
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({
      profile,
      msg: "education deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "server error",
    });
  }
};
