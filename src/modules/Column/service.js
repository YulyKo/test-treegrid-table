const { v4: uuidv4 } = require('uuid');
const repository = require('./repository');

const indexAll = () => {
  return repository.getAll();
};

const create = column => {
  column.id = uuidv4();
  column.field = column.id;
  const columns = repository.getAll();
  columns.push(column);
  repository.update(columns);
  return column;
};

const updateOne = (columnId, columnData) => {
    const columns = repository.getAll();
    const index = columns.findIndex(column => column.id === columnId);

    columns.splice(index, 1, {
        ...columns[index],
        ...columnData
    });

    repository.update(columns);
};

const deleteMany = ({ ids }) => {
    const columns = repository.getAll();
    const deleted = columns.filter(column => ids.includes(column.id));
    const updated = columns.filter(column => !ids.includes(column.id));
    repository.update(updated);
    return deleted;
};

module.exports = {
  indexAll,
  create,
  updateOne,
  deleteMany
};
