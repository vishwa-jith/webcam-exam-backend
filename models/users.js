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
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
