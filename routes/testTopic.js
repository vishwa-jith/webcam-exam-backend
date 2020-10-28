var express = require("express");
var router = express.Router();
var Topic = require("../models/testTopic");
var passport = require("passport");
var authenticate = require("../authenticate");
router.get("/", (req, res) => {
  Topic.find((error, topics) => {
    if (error) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Failed to fetch test topic!" });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(topics);
    }
  });
});
module.exports = router;
