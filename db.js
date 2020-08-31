/** Database setup for BizTime. */
const { Client } = require("pg")
// const secure_DB_URI = require("./secure")

// let DB_URI = secure_DB_URI;

// let db = new Client({
//   connectionString: secure_DB_URI
// });


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


