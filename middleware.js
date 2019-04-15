const util = require("util");
const logger = require("./logger");
const { MongoDbQueryParams } = require("@sugo/mongodb-queryparams");
const { InvalidTokenError, UnauthorizedError, ResourceNotFound } = require("./exceptions");
const services = require("./services");
const User = require("./models/User");
const Product = require("./models/Product");

const logRequest = async (req, res, next) => {
  let log = util.format("Request ID: ( %s ) %s: %s", req.id, req.method, req.url);
  log += util.format(" --> query %j", req.query);
  log += util.format(" --> body %j", req.body);
  logger.info(log);
  return next ? next() : null;
};

const logResponse = async (req, res, next) => {
  next ? await next() : null;
  const { id, statusCode, statusMessage, body, method, url } = res;
  const log = `Response ID: ( ${id} ) ${method}: ${url} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(body)}`;
  logger.info(log);
};

const parseQueryParams = async (req, res, next) => {
  req.query = MongoDbQueryParams.parseQueryParams(req.query);
  return next ? await next() : null;
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) throw new UnauthorizedError();
  const [bearer, token] = req.headers.authorization.split(" ");
  if (!bearer || bearer.toUpperCase() !== "BEARER" || !token) {
    throw new InvalidTokenError(`Invalid auth header, Must be 'Bearer <token>', found '${req.headers.authorization}'`);
  }
  const { _id } = await services.decodeToken(token);
  const user = await User.findById(_id);
  if (!user) {
    throw new InvalidTokenError(`Token does not belong to any user, value of _id: ${_id}`);
  }
  req.user = user;
  return next ? await next() : null;
};

const doesProductExists = async (req, res, next) => {
  const instance = await Product.findById(req.params.id);
  if (!instance) throw new ResourceNotFound(`Could not find product with _id '${req.params.id}'`);
  return next ? await next() : null;
};

const doesUserExists = async (req, res, next) => {
  const instance = await Product.findById(req.params.id);
  if (!instance) throw new ResourceNotFound(`Could not find user with _id '${req.params.id}'`);
  return next ? await next() : null;
};

module.exports = {
  logRequest,
  logResponse,
  parseQueryParams,
  authenticate,
  doesProductExists,
  doesUserExists
};
