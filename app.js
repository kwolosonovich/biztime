/** BizTime express application. */


const express = require("express");

const app = express();
const ExpressError = require("./expressError")
const db = require('./db')
const companiesRoutes = require("./routes/companies")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/companies", companiesRoutes);

app.get('/', async (req, res, next) => {
  console.log('here')
  const data = await db.query(
    `SELECT * FROM companies`)
  return res.json(data.rows)
})

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
