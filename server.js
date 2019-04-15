const { createServer } = require("@sugo/server");
const { getMiddleware: jsonBodyParser } = require("@sugo/body-parser-json");
const { getMiddleware: cors } = require("@sugo/cors");
const router = require("./routes");
const logger = require("./logger");
const { logRequest, logResponse, parseQueryParams } = require("./middleware");

const server = createServer((req, res) => router.handle(req, res))
  .useMiddleware(jsonBodyParser())
  .useMiddleware(cors())
  .useMiddleware(parseQueryParams)
  .useMiddleware(logRequest)
  .useMiddleware(logResponse)
  .setErrorHandler((req, res, err) => {
    const defaultValues = {
      code: "N/A",
      message: "Unexpected Error",
      name: err.name ? err.name : err.constructor.name ? err.constructor.name : "Error",
      status: 500
    };
    const json = Object.getOwnPropertyNames(err).reduce((obj, key) => {
      obj[key] = err[key];
      return obj;
    }, defaultValues);
    const { id, method, url } = req;
    const { status, message } = json;
    const log = `Response ID: ( ${id} ) ${method}: ${url} ${status} ${message} ---> body: ${JSON.stringify(json)}`;
    logger.error(log);
    return res.status(json.status).json(json);
  })
  .addListener("listening", () => {
    logger.info(`Envoirment: ${JSON.stringify(process.env, null, 2)}`);
    logger.info(`Server started at port ${server.address().port}`);
  });

module.exports = server;
