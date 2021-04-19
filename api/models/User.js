const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
  following: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
  profile_pic: {
    type: String,
    default:
      "https://www.willierippleevents.com/wp-content/uploads/2016/01/Dummy-Profile-Picture-300x300.jpg",
  },
  activityStatus: {
    type: String,
    default: "offline",
  },
});

module.exports = mongoose.model("User", UserSchema);
