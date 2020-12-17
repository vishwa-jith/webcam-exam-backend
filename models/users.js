const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  is_doctor: {
    type: Boolean,
    default: false,
  },
  last_seen: {
    type: Date,
    default: Date.now,
  },
  default_avatar: {
    type: Boolean,
    default: true,
  },
  default_cover: {
    type: Boolean,
    default: true,
  },
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
