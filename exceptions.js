class HttpError extends Error {
  constructor(message) {
    super(message || "Unexpected error");
    this.status = 500;
    this.code = "HttpError";
    this.name = "HttpError";
  }

  toJSON() {
    return Object.assign({ message: this.message, stack: this.stack }, this);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message || "Unathorized, please log In");
    this.status = 401;
    this.code = "UnauthorizedError";
    this.name = "UnauthorizedError";
  }
}

class InvalidTokenError extends HttpError {
  constructor(message) {
    super(message || "Invalid token");
    this.status = 400;
    this.code = "InvalidTokenError";
    this.name = "InvalidTokenError";
  }
}

class InvalidPasswordError extends HttpError {
  constructor(message) {
    super(message || "Invalid password");
    this.status = 400;
    this.code = "InvalidPassword";
    this.name = "InvalidPassword";
  }
}

class ResourceNotFound extends HttpError {
  constructor(message) {
    super(message || "Resource not found");
    this.status = 404;
    this.code = "ResourceNotFound";
    this.name = "ResourceNotFound";
  }
}

module.exports = {
  InvalidTokenError,
  InvalidPasswordError,
  ResourceNotFound,
  UnauthorizedError
};
