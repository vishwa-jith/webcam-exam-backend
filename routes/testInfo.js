var express = require("express");
var router = express.Router();
var Topic = require("../models/testTopic");
var Info = require("../models/testInfo");
var Answer = require("../models/answer");
var passport = require("passport");
var authenticate = require("../authenticate");

router
  .post("/start-test/:testId", authenticate.verifyUser, (req, res) => {
    const intial_answers = [];
    for (var q_no = 0; q_no < req.body.q_len; q_no++) {
      intial_answers.push({
        user_id: req.user._id,
        test_id: req.params.testId,
        q_no,
      });
    }
    Answer.create(intial_answers, (error, answers) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json(error);
      } else {
        Info.create(
          {
            user_id: req.user._id,
            test_id: req.params.testId,
            start_time: req.body.start_time,
          },
          (error, info) => {
            if (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json(error);
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(answers);
            }
          }
        );
      }
    });
  })
  .post("/add-warning/:testId", authenticate.verifyUser, (req, res) => {
    Info.update(
      {
        user_id: req.user._id,
        test_id: req.params.testId,
      },
      { $inc: { no_of_warning: 1 } },
      (error, info) => {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json(error);
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(info);
        }
      }
    );
  })
  .get("/leaderboard/:testId", authenticate.verifyUser, (req, res) => {
    Info.find({ test_id: req.params.testId }, (error, info) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json(error);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(info);
      }
    });
  });
module.exports = router;
