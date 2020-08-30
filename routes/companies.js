const express = require("express")
const ExpressError = require("../expressError");
const router = express.Router();

const db = require("../db")

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
        const result = await db.query(
            `SELECT code, name, description FROM code
            WHERE code = $1`, [code]
        )
        return res.json({ company: result.code, result.name, result.description });
    }
})

router.post('/companies', async (req, res, next) => {
    let code = req.body.code
    let company = req.body.company
    let description = req.body.description
    try {
        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
           VALUES ($1, $2, $3) 
           RETURNING code, name, description`, [code, name, description]
        )
        return res.json({ company: result.code, result.name, result.description });
    } catch (e) {
        return next(e)
    }
})

router.put('/companies/:code', (res, req, next) => {
    let code = req.param.code
    try {
        const result = await db.query(
            `UPDATE code, name, company FROM companies 
            WHERE code = $1`, [code]
        )
        return res.json({ company: result.code, result.name, result.description });
    } catch (e) {
        return next(e)
    }
})

router.delete("/companies/:code", (req, res, next) => {
    let code = req.param.code
    try { 
        const result = await db.query(
            `SELECT code FROM companies 
            WHERE code = $1`, [code]
        )
        return ({status: 'deleted'})
    } catch (e) {
        return next(e)
    }
})



