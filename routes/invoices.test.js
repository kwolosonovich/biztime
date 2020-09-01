// connect to test database
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testInvoice;
let testComapny;

beforeEach(async function () {
  let invoiceResult = await db.query(
    `INSERT INTO invoices (comp_code, amt, paid, add_date)
        VALUES ('testApple', '300', 'f', '2020-08-31')
        RETURNING comp_code, amt, paid, add_date`
  );
    testInvoice = invoiceResult.rows[0];

    let companyResult = await db.query(
        `INSERT INTO companies (code, name, description)
        VALUES ('testApple', 'testApple', 'Maker of OSX.')
        RETURNING code, name, description`
        );
    testCompany = companyResult.rows[0];
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
    expect(res.statusCode).toEqual(200);
  });
});
