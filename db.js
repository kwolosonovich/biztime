/** Database setup for BizTime. */
const { Client } = require("pg")

let data;

if (process.env.NODE_ENV === "test") {
  data = "biztime_test";
} else {
  data = "biztime";
}

let db = new Client({
  database: data
});

db.connect();

module.exports = db;


