const rowService = require('./service');

const fetchAll = async (request, response, next) => {
  try {
    await rowService.indexAll(
      (error, result) => {
        if (error) return response.status(error.status).send(error);

        return response.status(200).json(result);
      }
    );
  } catch (error) {
    next(error);
  }
};

const create = async (request, response, next) => {
  try {
    const { params, body } = request;

    // @rowStatus can be 'next' or 'child'
    await rowService.create(params.rowStatus, body);
    return response.status(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAll,
  create
};
