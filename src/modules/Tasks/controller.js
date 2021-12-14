const { indexAll } = require('./service');

const fetchAll = async (request, response, next) => {
  try {
    await indexAll(
      (error, result) => {
        if (error) return response.status(error.status).send(error);

        return response.status(200).json(result);
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchAll };
