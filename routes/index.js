const { Router } = require("@sugo/router");
const packageJson = require("../package.json");
module.exports = new Router()
  .options("/(.*)", (req, res) => res.end())
  .get("/", (req, res) =>
    res.json({
      name: packageJson.name,
      version: packageJson.version
    })
  )
  .useSubrouter("/auth", require("./auth"))
  .useSubrouter("/products", require("./products"))
  .useSubrouter("/users", require("./users"));
