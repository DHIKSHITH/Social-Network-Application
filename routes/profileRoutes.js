const express = require("express");
const profilecontroller = require("../contoller/profileController");
const authController = require("../contoller/authController");

const profileRouter = express.Router();

//create a profile
profileRouter
  .route("/create")
  .post(authController.protect, profilecontroller.createprofile);
profileRouter.route("/findAll").get(profilecontroller.getAllProfile);
profileRouter
  .route("/update")
  .post(authController.protect, profilecontroller.createprofile);
profileRouter
  .route("/user/:user_id")
  .get(authController.protect, profilecontroller.getProfile);
profileRouter.route("/me").get(authController.protect, profilecontroller.getMe);
profileRouter
  .route("/delete")
  .delete(authController.protect, profilecontroller.deleteProfile);
profileRouter
  .route("/addExperience")
  .put(authController.protect, profilecontroller.addExperience);
profileRouter
  .route("/experience/:exp_id")
  .delete(authController.protect, profilecontroller.deleteExperience);
profileRouter
  .route("/addEducation")
  .put(authController.protect, profilecontroller.addEducation);
profileRouter
  .route("/education/:edu_id")
  .delete(authController.protect, profilecontroller.deleteEducation);
profileRouter
  .route("/request/:user_id")
  .post(authController.protect, profilecontroller.sendRequest);
profileRouter
  .route("/acceptRequest/:request_id")
  .post(authController.protect, profilecontroller.acceptRequest);
//education
// profileRouter.route("/createEdu").post(educontroller.createedu);

//experience
// profileRouter.route("/createExp").post(experienceController.createExperience);

module.exports = profileRouter;
