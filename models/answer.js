const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Answer = new Schema({
  id: {
    type: Number,
    required: true,
  },
  test_id: {
    type: mongoose.Types.ObjectId,
    ref: "Topic",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  answer: {
    type: Number,
    default: null,
  },
  is_answered: {
    type: Number,
    default: false,
  },
  is_marked: {
    type: Number,
    default: false,
  },
});
module.exports = mongoose.model("Answer", Answer);
