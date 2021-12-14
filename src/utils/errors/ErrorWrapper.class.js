// import { BaseError } from './BaseError.class';

const { BaseError } = require("./BaseError.class");

class ErrorWrapper extends BaseError {
  cause;

  constructor(message, cause) {
    super(message);
    Object.defineProperty(this, 'cause', { value: cause });
    this.stack = `${this.name}: ${this.message}\n  Cause: ${cause.stack}`;
  }

  toString() {
    return `${this.name}: ${this.message}\n  Cause: ${this.cause}`;
  }
}

module.exports = { ErrorWrapper };
