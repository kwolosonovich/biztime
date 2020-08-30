const express = require("express")
const ExpressError = require("../expressError");
const router = express.Router();

const db = require("../db")

let router = new Express.Router()

router.get('/companies', async (req, res, next) => {
    debugger;
    try {
        const result = db.query(
            `SELECT code, name FROM companies`
        )
        return await res.json({companies: result.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/companies/:code', async (req, res, next) => {
    let code = req.params.code
    try {
        const result = db.query(
            `SELECT code, name, description FROM code
            WHERE code = $1`, [code]
        )
        return await res.json({ company: result.code, result.name, result.description });
    }
})



