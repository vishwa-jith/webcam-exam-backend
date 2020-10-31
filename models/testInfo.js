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
    test_duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Info", testInfo);
// testTopic.map((topic)=>{
//   if(topic.test_taken_users.includes(user_id)){
//     const selected=info.filter((ino)=>ino.user_id===user_id);
//     return <></>
//   }
//   else{
//     return <></>
//   }
// })