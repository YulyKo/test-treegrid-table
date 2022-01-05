const columnService = require('./service');

const fetchAll = (request, response, next) => {
  try {
    const result = columnService.indexAll();
    return response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createOne = ({ body }, response, next) => {
  try {
    if (body) {
      columnService.create(body);
    }

    return response.status(200).json({status: 'success'});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAll,
  createOne
};
