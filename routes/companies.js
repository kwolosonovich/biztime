const express = require("express");
const slugify = require("slugify");

const router = new express.Router();
const db = require("../db");


const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const data = await db.query(`SELECT code, name FROM companies`);
    return res.json({ companies: data.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;

    const data = await db.query(
      "SELECT code, name, description FROM companies WHERE code = $1",
      [code]
    );
    if (data.rows.length === 0) {
      let notFoundError = new Error(`Company not found ${code}`);
      notFoundError.status = 404;
      throw notFoundError;
    }
    return res.json({ company: data.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {

  try {
    let { name, description } = req.body;
    let code = slugify(name, {lower: true});

    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
           VALUES ($1, $2, $3) 
           RETURNING code, name, description`,
      [code, name, description]
    );
    return res.json({ company: result.rows[0] });
  } catch (e) {
    return next(e);
  }
});

router.put("/:code", async (req, res, next) => {
  try {
    let code = req.params.code;
    let { name, description } = req.body;

    const result = await db.query(
      `UPDATE companies
            SET name=$1, description=$2
            WHERE code = $3
            RETURNING code, name, description`,
      [name, description, code]
    );
    if (result.rows.length === 0) {
      throw new ExpressError(`Company not found: ${code}`, 404);
    } else {
      return res.json({ company: result.rows[0] });
    }
  } catch (err) {
    return next(err);
  }
});

router.delete("/:code", async (req, res, next) => {
  let code = req.params.code;
  try {
    const result = await db.query(
      `DELETE FROM companies 
            WHERE code = $1
            RETURNING code`,
      [code]
    );
    return res.json({ status: "deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
