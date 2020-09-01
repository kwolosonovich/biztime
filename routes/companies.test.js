// connect to test database
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

let testCompany;

beforeEach (async function() {
    let result = await db.query(
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
        expect(res.statusCode).toEqual(200);
    })
})

describe("GET /companies/code", () => {
  test("Get company by code", async () => {
    const res = await request(app).get("/companies/apple");
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /companies", () => {
  test("Add a company", async () => {
    const res = await request(app)
      .post(`/companies`)
      .send({
        code: "testCode",
        name: "testName", 
        description: "testDescription"
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("put /companies/code", () => {
  test("Update a company", async () => {
    const res = await request(app).put(`/companies/${testCompany.code}`).send({
      code: testCompany,
      name: "testName",
      description: "updatedDescription",
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("delete /companies/code", () => {
  test("Delete a company", async () => {
    const res = await request(app).delete(`/companies/${testCompany.code}`);
    expect(res.statusCode).toEqual(200);
  });
});

