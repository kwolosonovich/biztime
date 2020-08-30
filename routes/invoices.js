const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router()
const db = require("../db");

routes.get('/invoices', async (req, res, next) => {
    try {
        const result = db.query(
            `SELECT *, name FROM invoices`
        )
        return await res.json({invoices: result.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/invoices/:id', async (req, res, next) => {
    let code = req.params.id
    try {
        const result = await db.query(
            `SELECT code, name, description FROM code
            WHERE code = $1`, [code]
        )
        return res.json({invoice: {result.id, result.amt, result.paid, ressult.add_date, ressult.paid_date, result.company: 
            {result.resultcode, result.name, result.description}}})
    } catch (e) {
        return next(e)
    }
})

router.post('/invoices', async (req, res, next) => {
    let invoice = req.body
    let id = invoice.id
    let amt = invoice.amt 
    let paid = invoice.paid
    let add_date = invoice.add_data
    let paid_date = invoice.paid_date
    let company = invoice.company
    try {
        const result = await db.query(
            `INSERT INTO invoices (id, amt, paid, add_date, paid_date, company)
            VALUES ($1, $2, $3, $4, $5, $6)`, [id, amt, paid, add_date, paid_date, company]
        )
        return res.json({invoice: {id, amt, paid, add_date, add_date, paid_date}})
    } catch (e) {
        return next(e)
    }
})

router.put('/invoices/:id', async (req, res, next) => {
    let invoice = req.body
    let id = invoice.id
    let amt = invoice.amt 
    let paid = invoice.paid
    let add_date = invoice.add_data
    let paid_date = invoice.paid_date
    let company = invoice.company
    try {
        const result = await db.query(
            `UPDATE id, amt, paid, add_date, paid_date, company FROM invoices
            WHERE id = $1`, [id]
        )
        return res.json({invoice: {id, amt, paid, add_date, add_date, paid_date}})
    } catch (e) {
        return next(e)
    }
})

router.delete('/invoices/:id', async (req, res, next) => {
    let code = req.params.id
    try {
        `DELETE FROM invoices 
        WHERE code = $1`, [code]
    } catch (e) {
        return next(e)
    }
})