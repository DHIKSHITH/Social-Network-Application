const mongoose = require("mongoose");

const profileschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    lowercase: true,
  },
  city: {
    type: String,
    required: [true, "can you pls say where you leave"],
  },
  skills: {
    type: [String],
    required: [true, "can you please specify atleast 1 skill"],
  },
  githubusername: {
    type: String,
  },
  about: {
    type: String,
    required: [true, "tell about yourself"],
  },
  website: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "status is a must"],
  },
  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      from: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      to: {
        type: Date,
      },
    },
  ],
  experience: [
    {
      job: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      to: {
        type: Date,
      },
      jobdesc: {
        type: String,
      },
    },
  ],
  notification: [
    {
      post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
      user: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  privateProfile: {
    type: Boolean,
  },
  connections: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
    },
  ],
  requests: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
    },
  ],
});

profileschema.index({ name: "text" });

const Profile = mongoose.model("profile", profileschema);

module.exports = Profile;
