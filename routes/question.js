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
                (answer, index) => answer.answer_option === req.body[index]
              );
              Topic.update(
                { _id: req.params.testId },
                {
                  $set: {
                    test_taken_users: [...topic.test_taken_users, req.user._id],
                  },
                },
                (error, update) => {
                  if (error) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ message: "Failed to update test topic!" });
                  } else {
                    Info.create(
                      {
                        user_id: req.user._id,
                        test_id: topic._id,
                        score:
                          (correct_answers.length / answers.length) *
                          topic.total_marks,
                      },
                      (error, info) => {
                        if (error) {
                          res.statusCode = 500;
                          res.setHeader("Content-Type", "application/json");
                          res.json({ message: "Failed to update mark score!" });
                        } else {
                          res.statusCode = 200;
                          res.setHeader("Content-Type", "application/json");
                          res.json({ info });
                        }
                      }
                    );
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
