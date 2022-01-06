const {v4: uuidv4} = require('uuid');
const repository = require('./repository');

const indexAll = () => {
  return repository.getAll();
};

const create = ({rowData, path, rowStatus}) => {
  const rows = repository.getAll();
  const {parentRows, pathInfo, row, rowIndex} = parsePath(path, rows);

  rowData.id = uuidv4();
  switch (rowStatus) {
    case 'next':
      parentRows.splice(rowIndex, 0, rowData);
      break;
    case 'child':
      row.subrows.push(rowData);
      break;
  }
  updateIndexes(rows.slice(pathInfo[0].index))
  repository.update(rows);
};

function parsePath(path, rows) {
  const rowId = path.pop();
  let parentRows = rows;
  const pathInfo = [];
  for (const rowId of path) {
    const index = parentRows.findIndex(item => item.id === rowId);
    const info = {row: parentRows[index], index};
    pathInfo.push(info);
    parentRows = info.row.subrows;
  }
  const rowIndex = parentRows.findIndex(row => row.id === rowId);
  return {pathInfo, parentRows, rowIndex, row: parentRows[rowIndex]};
}

function updateIndexes(rows) {
  let index = rows[0].index;

  iterateRows(rows, row => {
    row.index = index;
    index++;
  });
}

function iterateRows(rows, callback) {
  function iterate(items) {
    for (const row of items) {
      callback(row);
      iterate(row.subrows);
    }
  }

  iterate(rows);
}

const updateOne = ({path, rowData}) => {
  const rows = repository.getAll();
  const {parentRows, rowIndex, row} = parsePath(path, rows);
  parentRows.splice(rowIndex, 1, {...row, ...rowData});
  repository.update(rows);
};

const addColumn = (column) => {
  const rows = repository.getAll();

  iterateRows(rows, row => {
    row[column.field] = column.defaultValue;
  });

  repository.update(rows);
};

const removeColumns = (columns) => {
  const fields = columns.map(column => column.field);
  const rows = repository.getAll();

  iterateRows(rows, row => {
    for (const field of fields) {
      delete row[field];
    }
  })

  repository.update(rows);
};

const deleteMany = ({ paths }) => {
  const rows = repository.getAll();
  let firstPath = null;

  for (const path of paths) {
    const { parentRows, rowIndex, pathInfo } = parsePath(path, rows)
    parentRows.splice(rowIndex, 1);

    if (firstPath === null || pathInfo.index < firstPath.index) {
      firstPath = pathInfo;
    }
  }

  updateIndexes(rows.slice(firstPath.index))
  repository.update(rows);
}

module.exports = {
  indexAll,
  create,
  updateOne,
  addColumn,
  removeColumns,
  deleteMany
};