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
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    test_taken_users: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Topic", testTopic);
