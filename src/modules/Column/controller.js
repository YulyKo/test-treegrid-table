const columnService = require('./service');
const rowService = require('../Row/service');
const socket = require('../socket');

const fetchAll = (request, response, next) => {
  try {
    const result = columnService.indexAll();
    return response.status(200).json(result);
  } catch (error) {
    next(error);
    return error;
  }
};

const createOne = ({ body }, response, next) => {
  try {
    if (body) {
      const column = columnService.create(body);
      rowService.addColumn(column);

      socket.send('rows:update', rowService.indexAll());
      socket.send('columns:update', columnService.indexAll());
    }

    return response.status(200).json({status: 'success'});
  } catch (error) {
    next(error);
    return error;
  }
};

// eslint-disable-next-line consistent-return
const updateOne = ({body, params}, response, next) => {
  try {
    if (body) {
      columnService.updateOne(params.columnId, body);
      socket.send('columns:update', columnService.indexAll());
    }

    return response.status(200).json({status: 'success'});
  } catch (error) {
    next(error);
    return error;
  }
};

const deleteMany = ({body}, response, next) => {
  try {
    const deleted = columnService.deleteMany(body);
    rowService.removeColumns(deleted);

    socket.send('rows:update', rowService.indexAll());
    socket.send('columns:update', columnService.indexAll());

    return response.status(200).json({status: 'success'});
  } catch (error) {
    next(error);
    return error;
  }
};

module.exports = {
  fetchAll,
  createOne,
  updateOne,
  deleteMany
};
