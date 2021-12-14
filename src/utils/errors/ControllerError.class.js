import { ErrorWrapper } from './ErrorWrapper.class';

export class ControllerError extends ErrorWrapper {
  constructor(request, cause) {
    super(`[${request.method}] ${request.path}`, cause);
  }
}

module.exports = { ControllerError };
