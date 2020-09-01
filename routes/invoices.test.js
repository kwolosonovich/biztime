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
  let companyResult = await db.query(
      `INSERT INTO companies (code, name, description)
      VALUES ('testApple', 'testAppleCo', 'Maker of OSX.')
      RETURNING code, name, description`
      );
  testCompany = companyResult.rows[0];

    let invoiceResult = await db.query(
      `INSERT INTO invoices (id, comp_code, amt, paid, add_date)
      VALUES ('100', 'testApple', '300', 'f', '2020-08-31')
      RETURNING id, comp_code, amt, paid, add_date`
    );
    testInvoice = invoiceResult.rows[0];
});

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
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

describe("GET /invoices/id", () => {
  test("Get invoice by id", async () => {
    const res = await request(app).get(`/invoices/${testInvoice.id}`);
    expect(res.statusCode).toEqual(200)
  })
})

describe("POST /invoices", () => {
  test("Add an invoice", async () => {
    const res = await request(app).post(`/invoices`).send({
      id: "200",
      comp_code: "testApple",
      amt: "400",
      paid: "t",
      add_date: "2020-09-01",
      paid_date: "2020-09-02",
    });
    expect(res.statusCode).toEqual(200);  
  });
});

