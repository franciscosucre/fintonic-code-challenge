const { Router } = require("@sugo/router");
const Product = require("../models/Product");
const { authenticate, doesProductExists } = require("../middleware");

module.exports = new Router()
  .get("/", async (req, res) =>
    res.json(
      await Product.find(req.query.filter, req.query.select, {
        limit: req.query.limit,
        skip: req.query.skip,
        sort: req.query.sort
      })
    )
  )
  .post("/", authenticate, async (req, res) => res.json(await Product.create(req.body)))
  .get("/:id", doesProductExists, async (req, res) =>
    res.json(
      await Product.findById(req.params.id, req.query.select, {
        limit: req.query.limit,
        skip: req.query.skip,
        sort: req.query.sort
      })
    )
  )
  .put("/:id", authenticate, doesProductExists, async (req, res) =>
    res.json(await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { projection: req.query.select, sort: req.query.sort, new: true }))
  )
  .delete("/:id", authenticate, doesProductExists, async (req, res) => res.json(await Product.findByIdAndDelete(req.params.id)));
