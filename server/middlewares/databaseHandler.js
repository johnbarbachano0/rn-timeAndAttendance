require("dotenv").config();
const db = require("./models");

const createDatabase = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { createDatabase };
