const { Router } = require("@sugo/router");
const User = require("../models/User");
const { authenticate, doesUserExists } = require("../middleware");

module.exports = new Router()
  .get("/", async (req, res) =>
    res.json(
      await User.find(req.query.filter, req.query.select, {
        limit: req.query.limit,
        skip: req.query.skip,
        sort: req.query.sort
      })
    )
  )
  .post("/", authenticate, async (req, res) => res.json(await User.create(req.body)))
  .get("/:id", doesUserExists, async (req, res) =>
    res.json(
      await User.findById(req.params.id, req.query.select, {
        limit: req.query.limit,
        skip: req.query.skip,
        sort: req.query.sort
      })
    )
  )
  .put("/:id", authenticate, doesUserExists, async (req, res) =>
    res.json(await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { projection: req.query.select, sort: req.query.sort, new: true }))
  )
  .delete("/:id", authenticate, doesUserExists, async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));
