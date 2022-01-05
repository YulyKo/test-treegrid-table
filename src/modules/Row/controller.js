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

const createOne = (request, response, next) => {
  try {
    // @rowStatus can be 'next' or 'child'
    // @body row data & parents indexes and inds array
    rowService.create(request.body);

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAll,
  createOne
};
