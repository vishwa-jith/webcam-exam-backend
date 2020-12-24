var express = require("express");
var router = express.Router();
var Answer = require("../models/answer");
var authenticate = require("../authenticate");

router
  .get("/:testId", authenticate.verifyUser, (req, res) => {
    Answer.find(
      { test_id: req.params.testId, user_id: req.user._id },
      (error, answers) => {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Failed to fetch test topic!" });
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(answers);
        }
      }
    );
  })
  .put("/update/:testId", authenticate.verifyUser, (req, res) => {
    Answer.updateOne(
      {
        test_id: req.params.testId,
        user_id: req.user._id,
        q_no: req.body.q_no,
      },
      { $set: { ...req.body } },
      (error, answer) => {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Failed to fetch test topic!" });
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(answer);
        }
      }
    );
  });
module.exports = router;
