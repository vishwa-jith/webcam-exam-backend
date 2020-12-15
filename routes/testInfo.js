var express = require("express");
var router = express.Router();
var Topic = require("../models/testTopic");
var Info = require("../models/testInfo");
var passport = require("passport");
var authenticate = require("../authenticate");

router
  .post("/start-test/:testId", authenticate.verifyUser, (req, res) => {
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
          res.json(info);
        }
      }
    );
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
  });
module.exports = router;
