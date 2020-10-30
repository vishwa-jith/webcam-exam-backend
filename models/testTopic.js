const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testTopic = new Schema(
  {
    test_name: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    is_test_taken: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    total_marks: {
      type: Number,
      default: 100,
    },
    description: {
      type: String,
      required: true,
    },
    duration_in_min: {
      type: Number,
      reuired: true,
    },
    is_exam_started: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Topic", testTopic);
