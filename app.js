require("dotenv").config;
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const useragent = require("express-useragent");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const refreshTokensRouter = require("./routes/refreshTokens");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(useragent.express());
app.use(function (req, res, next) {
  myUseragent = req.useragent;
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/refresh-tokens", refreshTokensRouter);

module.exports = app;
