const { v4: uuidv4 } = require('uuid');
const repository = require('./repository');

const indexAll = () => {
  return repository.getAll();
};

const create = (newColumnData) => {
  newColumnData.id = uuidv4();
  const columns = repository.getAll();
  columns.push(newColumnData);
  repository.update(columns);
};

module.exports = {
  indexAll,
  create
};
