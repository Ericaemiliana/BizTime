/** Routes for invoices. */

const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

/** GET / => list of industries.
 *
 * =>  {industries: [{id, comp_code}, ...]}
 *
 * */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, comp_code
           FROM industries 
           ORDER BY id`
    );

    return res.json({ industries: result.rows });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id] => detail on invoice
 *
 * =>  {industries: {id,
 *                code,
 *                industry,
 *                company: {code, name, description}}}
 *
 * */

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    const result = await db.query(
      `SELECT i.id, 
                  i.comp_code, 
                  i.code, 
                  i.industry      
           FROM industries AS i
             INNER JOIN companies AS c ON (i.comp_code = c.code)  
           WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const data = result.rows[0];
    const industry = {
      id: data.id,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description,
      },
      code: data.code,
      industry: data.industry,
    };

    return res.json({ industry: industry });
  } catch (err) {
    return next(err);
  }
});

/** POST / => add new industry
 *
 *
 *
 * */

router.post("/", async function (req, res, next) {
  try {
    let { comp_code, amt } = req.body;
    //let code = slugify(comp_code, { lower: true });

    const result = await db.query(
      `INSERT INTO industries (comp_code, code, industry) 
           VALUES ($1, $2, $3) 
           RETURNING id, comp_code, code, industry`,
      [comp_code, code, industry]
    );

    return res.json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[code] => update industry
 *
 *
 * */

router.put("/:id", async function (req, res, next) {
  try {
    let { code, industry } = req.body;
    let id = req.params.id;

    const currResult = await db.query(
      `SELECT paid
           FROM industries
           WHERE id = $1`,
      [id]
    );

    if (currResult.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const result = await db.query(
      `UPDATE industries
           SET code=$1, industry=$2
           WHERE id=$4
           RETURNING id, comp_code, code, industry`,
      [code, industry]
    );

    return res.json({ industry: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[code] => delete industry
 *
 * => {status: "deleted"}
 *
 */

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    const result = await db.query(
      `DELETE FROM industries
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
