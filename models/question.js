const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = new Schema(
  {
    test_id: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    answer_option: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Question", Question);
