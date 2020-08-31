// connect to test database
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach (async function() {
    let results = await db.query(
      `INSERT INTO companies (code, name, description)
        VALUES ('apple', 'Apple Computer', 'Maker of OSX.')
        RETURNING code, name, description`
    );
    testCompany = result.rows[0]
})

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM companies");
});

afterAll(async function () {
  // close db connection
  await db.end();
});

describe("GET /companies", () => {
    test("Get all companies", async () => {
        const res = await request(app).get("/companies")
        console.log(res.data)
        expect(res.statusCode).toEqual(200);
    })
})