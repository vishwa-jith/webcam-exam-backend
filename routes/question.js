var express = require("express");
var router = express.Router();
var Question = require("../models/question");
var Topic = require("../models/testTopic");
var Info = require("../models/testInfo");
var authenticate = require("../authenticate");
router
  .get("/:testId", authenticate.verifyUser, (req, res) => {
    Question.find({ test_id: req.params.testId }, (error, questions) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Failed to fetch test topic!" });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ user_id: req.user._id, questions });
      }
    });
  })
  .post("/add", authenticate.verifyUser, (req, res) => {
    Question.create(req.body, (error, question) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Failed to add test topic!" });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(question);
      }
    });
  })
  .post("/add-mark/:testId", authenticate.verifyUser, (req, res) => {
    Question.find(
      { test_id: req.params.testId },
      "answer_option",
      (error, answers) => {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Failed to fetch answer options!" });
        } else {
          Topic.findOne({ _id: req.params.testId }, (error, topic) => {
            if (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ message: "Failed to fetch test topic!" });
            } else {
              const correct_answers = answers.filter(
                (answer, index) =>
                  answer.answer_option ===
                  parseInt(req.body.answers[index].answer)
              );
              Info.update(
                { user_id: req.user._id, test_id: topic._id },
                {
                  $set: {
                    score:
                      (correct_answers.length / answers.length) *
                      topic.total_marks,
                    end_time: req.body.end_time,
                    answers_attended: req.body.answers_attended,
                    answers_marked: req.body.answers_marked,
                    unanswered: req.body.unanswered,
                    is_fraudulant: req.body.is_fraudulant,
                  },
                },
                (error, info) => {
                  if (error) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.json(error);
                  } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                      message: "Test Submitted Sucessfully!",
                    });
                  }
                }
              );
            }
          });
        }
      }
    );
  });
module.exports = router;
