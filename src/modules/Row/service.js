const { v4: uuidv4 } = require('uuid');
const repository = require('./repository');

const indexAll = async (callback) => {
  return callback(null, repository.getAll());
};

const create = ({ rowData, path, rowStatus }) => {
  const allRows = repository.getAll();
  let parentRows = allRows;
  let rowId = path.pop();
  const pathInfo = [];
  for (const rowId of path) {
    const index = parentRows.findIndex(item => item.id === rowId);
    const info = { row: parentRows[index], index }
    pathInfo.push(info);
    parentRows = info.row.subrows;
  }
  rowData.id = uuidv4();
  const rowIndex = parentRows.findIndex(row => row.id === rowId);
  switch (rowStatus) {
    case 'next':
      parentRows.splice(rowIndex, 0, rowData);
      break;
    case 'child':
      const row = parentRows[index];
      row.subrows.push(rowData);
      break;
  }
  const rowsToUpdate = allRows.slice(pathInfo[0].index);
  let index = pathInfo[0].row.index;
  updateIndexes(index, rowsToUpdate);

  repository.update(allRows);
};

function updateIndexes(index, rows) {
  for (const row of rows) {
    row.index = index;
    index = updateIndexes(index + 1, row.subrows);
  }
  return index;
}

module.exports = {
  indexAll,
  create
};
