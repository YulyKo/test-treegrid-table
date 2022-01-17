const rowService = require('./service');
const socket = require('../socket');

const fetchAll = async (request, response, next) => {
  try {
    const result = rowService.indexAll();
    return response.status(200).json(result);
  } catch (error) {
    next(error);
    return error;
  }
};

const createOne = (request, response, next) => {
  try {
    rowService.create(request.body);
    socket.send('rows:update', rowService.indexAll());

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
    return error;
  }
};

const updateOne = (request, response, next) => {
  try {
    rowService.updateOne(request.body);
    socket.send('rows:update', rowService.indexAll());

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
    return error;
  }
};

const deleteMany = (request, response, next) => {
  try {
    rowService.deleteMany(request.body);
    socket.send('rows:update', rowService.indexAll());

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
    return error;
  }
};

const paste = (request, response, next) => {
  try {
    rowService.paste(request.body);
    socket.send('rows:update', rowService.indexAll());

    return response.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
    return error;
  }
};

module.exports = {
  fetchAll,
  createOne,
  updateOne,
  deleteMany,
  paste
};
