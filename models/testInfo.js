const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testInfo = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    score: {
      type: Number,
      default: 0,
    },
    is_fraudulant: {
      type: Boolean,
      default: false,
    },
    no_of_warning: {
      type: Number,
      default: 0,
    },
    answers: [Number],
    test_duration: {
      type: Number,
      default: 0,
    },
    start_time: {
      type: Date,
    },
    end_time: {
      type: Date,
    },
    answers_attended: {
      type: Number,
    },
    answers_marked: {
      type: Number,
    },
    unanswered: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Info", testInfo);
