var express = require("express");
var router = express.Router();
var User = require("../models/users");
var passport = require("passport");
var authenticate = require("../authenticate");
router
  .get("/", authenticate.verifyUser, (req, res, next) => {
    User.find({ _id: { $ne: req.user._id } }, ["_id", "username"])
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader("ContentType", "application/json");
          res.json(user);
        },
        (error) => {
          next(error);
        }
      )
      .catch((error) => next(error));
  })
  .put("/update/lastSeen", authenticate.verifyUser, (req, res) => {
    User.updateOne(
      { _id: req.user._id },
      { last_seen: new Date() },
      (error, data) => {
        if (error) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "Failed to to disconnect!" });
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(data);
        }
      }
    );
  });
router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: err });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        if (req.body.is_doctor) {
          user.is_doctor = req.body.is_doctor;
        }
        user.save((err, user) => {
          if (err) {
            res.statusCode = message;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Registration Successful!" });
          });
        });
      }
    }
  );
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 403;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Login Unsuccessful!", err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: "Login Unsuccessful!",
          err: "Could not log in user!",
        });
      }
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        message: "Login Successful!",
        token: token,
      });
    });
  })(req, res, next);
});
router.get("/logout", authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.json({ message: "Logout Successful!" });
});
router.get("/profile", authenticate.verifyUser, (req, res) => {
  User.findById(req.user._id)
    .then(
      (profile) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.json(profile);
      },
      (error) => next(error)
    )
    .catch((error) => next(error));
});
router.post("/update-profile", authenticate.verifyUser, (req, res) => {
  const { firstname, lastname } = req.body;
  User.update(
    { _id: req.user._id },
    { $set: { firstname, lastname } },
    (error, profile) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: "Failed to Update User Details!",
        });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: "User Details Updated successfully!",
          profile,
        });
      }
    }
  );
});
module.exports = router;
