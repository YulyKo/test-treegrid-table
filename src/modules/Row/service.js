const {v4: uuidv4} = require('uuid');
const repository = require('./repository');

const indexAll = () => {
  return repository.getAll();
};

function insertRow(status, data, pathInfo) {
  data.id = uuidv4();
  data.subrows = [];
  switch (status) {
    case 'next':
      pathInfo.parentRows.splice(pathInfo.rowIndex + 1, 0, data);
      break;
    case 'child':
      pathInfo.row.subrows.push(data);
      break;
    default:
      break;
  }
}

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

function iterateRows(rows, callback) {
  function iterate(items) {
    for (const row of items) {
      callback(row);
      iterate(row.subrows);
    }
  }

  iterate(rows);
}

function updateIndexes(rows) {
  let { index } = rows[0];

  iterateRows(rows, row => {
    row.index = index;
    index += 1;
  });
}

const create = ({ rowData, path, rowStatus }) => {
  console.log('sdhjf');
  const rows = repository.getAll();
  const toPath = parsePath(path, rows);

  insertRow(rowStatus, rowData, toPath);
  console.log('jkdfkjdf', toPath.pathInfo[0]);
  if (toPath.pathInfo.length > 0) {
    if (toPath.pathInfo[0].index !== undefined) {
      console.log('index', toPath.pathInfo[0].index);
      const indexes = rows.slice(toPath.pathInfo[0].index);
      updateIndexes(indexes);
    } else {
     updateIndexes(rows.slice(toPath.pathInfo[0]));

    }
  }
  repository.update(rows);
};

const updateOne = ({ path, rowData }) => {
  const rows = repository.getAll();
  const {parentRows, rowIndex, row} = parsePath(path, rows);
  parentRows.splice(rowIndex, 1, {...row, ...rowData});
  repository.update(rows);
};

const addColumn = column => {
  const rows = repository.getAll();

  iterateRows(rows, row => {
    row[column.field] = column.defaultValue;
  });

  repository.update(rows);
};

const removeColumns = columns => {
  const fields = columns.map(column => column.field);
  const rows = repository.getAll();

  iterateRows(rows, row => {
    for (const field of fields) {
      delete row[field];
    }
  });

  repository.update(rows);
};

const deleteMany = ({ paths }) => {
  const rows = repository.getAll();
  let firstPath = null;

  for (const path of paths) {
    const { parentRows, rowIndex, pathInfo } = parsePath(path, rows);
    parentRows.splice(rowIndex, 1);

    if (firstPath === null || pathInfo.index < firstPath.index) {
      firstPath = pathInfo;
    }
  }

  updateIndexes(rows.slice(firstPath.index));
  repository.update(rows);
};

const paste = ({ rowStatus, fromPaths, toPath }) => {
  const rows = repository.getAll();
  const to = parsePath(toPath, rows);

  for (const fromPath of fromPaths) {
    const from = parsePath(fromPath, rows);
    insertRow(rowStatus, { ...from.row }, to);
  }

  updateIndexes(rows.slice(to.pathInfo.index));
  repository.update(rows);
};

module.exports = {
  indexAll,
  create,
  updateOne,
  addColumn,
  removeColumns,
  deleteMany,
  paste
};
