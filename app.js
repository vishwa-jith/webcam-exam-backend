//Imports
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var config = require("./config");
var passport = require("passport");
var authenticate = require("./authenticate");

//Import Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var topicRouter = require("./routes/testTopic");
var questionRouter = require("./routes/question");
var infoRouter = require("./routes/testInfo");

var app = express();

//Mongoose connection
mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//Watch DB
db.once("open", () => {
  console.log("DB connected correctly");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/test-topic", topicRouter);
app.use("/questions", questionRouter);
app.use("/test-info", infoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
