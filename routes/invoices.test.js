// connect to test database
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach(async function () {
  let results = await db.query(
    `INSERT INTO invoices (comp_code, amt)
        VALUES ('apple', '300')
        RETURNING id, comp_code, amt`
  );
  testCompany = result.rows[0];
});

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM invoices");
});

afterAll(async function () {
  // close db connection
  await db.end();
});

describe("GET /invoices", () => {
  test("Get all invoices", async () => {
    const res = await request(app).get("/invoices");
    console.log(res.data);
    expect(res.statusCode).toEqual(200);
  });
});
