const rowService = require('./service');
const socket = require('../socket');

const fetchAll = async (request, response, next) => {
  try {
    const result = rowService.indexAll()
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createOne = (request, response, next) => {
  try {
    // @rowStatus can be 'next' or 'child'
    // @body row data & parents indexes and inds array
    rowService.create(request.body);
    socket.send('rows:update', rowService.indexAll())

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const updateOne = (request, response, next) => {
    try {
        // @rowStatus can be 'next' or 'child'
        // @body row data & parents indexes and inds array
        rowService.updateOne(request.body);
        socket.send('rows:update', rowService.indexAll())

        return response.status(200).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
  fetchAll,
  createOne,
  updateOne
};
