var express = require("express");
var router = express.Router();
var Topic = require("../models/testTopic");
var Info = require("../models/testInfo");
var passport = require("passport");
var authenticate = require("../authenticate");
router
  .get("/", authenticate.verifyUser, (req, res) => {
    Topic.find((error, topics) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Failed to fetch test topic!" });
      } else {
        Info.find({ user_id: req.user._id }, (error, info) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Failed to fetch test info!" });
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ user_id: req.user._id, topics, info });
          }
        });
      }
    });
  })
  .get("/:testId", authenticate.verifyUser, (req, res) => {
    Info.find(
      { user_id: req.user._id, test_id: req.params.testId },
      (error, info) => {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Failed to fetch test info!" });
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(info);
        }
      }
    );
  })
  .get("/single/:testId", authenticate.verifyUser, (req, res) => {
    Topic.find({ _id: req.params.testId }, (error, topic) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Failed to fetch test topic!" });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(topic);
      }
    });
  })
  .post("/add", authenticate.verifyUser, (req, res) => {
    Topic.create(req.body, (error, topic) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Failed to add test topic!" });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.json(topic);
      }
    });
  });
module.exports = router;
