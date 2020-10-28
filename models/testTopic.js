const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testTopic = new Schema(
  {
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Topic", testTopic);
