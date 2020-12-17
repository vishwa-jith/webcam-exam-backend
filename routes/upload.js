var express = require("express");
var multer = require("multer");
var router = express.Router();
var User = require("../models/users");
var authenticate = require("../authenticate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${req.user._id.toString()}-${file.fieldname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router
  .post(
    "/profile-image",
    authenticate.verifyUser,
    upload.single("profile"),
    (req, res) => {
      User.update(
        { _id: req.user._id },
        { $set: { default_avatar: false } },
        (error, profile) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({
              messsage: "Failed to Upload Profile Image!",
            });
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              messsage: "Profile Image Uploaded successfully!",
              profile,
            });
          }
        }
      );
    }
  )
  .post(
    "/cover-image",
    authenticate.verifyUser,
    upload.single("cover"),
    (req, res) => {
      User.update(
        { _id: req.user._id },
        { $set: { default_cover: false } },
        (error, profile) => {
          if (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({
              messsage: "Failed to Upload Cover Image!",
            });
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              messsage: "Cover Image Uploaded successfully!",
              profile,
            });
          }
        }
      );
    }
  );
module.exports = router;
