const { ControllerError, getStatusCodeFromError } = require('./errors/ErrorWrapper.class');

const wrapper = async (func, request, response, next) => {
  try {
    await func();
  } catch (error) {
    const errorStatusCode = getStatusCodeFromError(error);
    if (errorStatusCode !== 500) {
      response.status(errorStatusCode).send(error);
    } else {
      next(new ControllerError(request, error));
    }
  }
};

module.exports = {
  wrapper
};
