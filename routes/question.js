var express = require("express");
var router = express.Router();
var Question = require("../models/question");
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
        res.json(questions);
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
  });
module.exports = router;
