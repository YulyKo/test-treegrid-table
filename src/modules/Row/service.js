const databaseData = require('../../../db.json');
const { v4: uuidv4 } = require('uuid');

const { allRows } = databaseData;

const indexAll = async (callback) => {
  return callback(null, allRows);
};

function compareParentsRows(row1, row2) {
  if (row1.index < row2.index) {
    return -1;
  }
  if (row1.index > row2.index) {
    return 1;
  }
  return 0;
}

function findPreRow(parentData, sortedParents) {
  let index = 0;
  let preRow = allRows;
  while (index < parentData.length) {
    const row = preRow.find(item => (
      item.id === sortedParents[index].id &&
      item.index === sortedParents[index].index
    ));

    if (row.index === sortedParents.splice(-1)[0].index) {
      preRow = row;
    } else if (row.subrows && row.subrows.length > 1) {
      preRow = row;
      index ++;
    }
  }
  return preRow;
}

const create = async (rowStatus, rowIndex, body) => {
  const { parentData, rowData } = body;
  rowData.id = uuidv4();
  if (parentData.length === 1) {
    allRows.find(item => item.index === sortedParents[0]);
  } else if (parentData.length > 1) {
    const sortedParents = parentData.sort(compareParentsRows);
    const preRow = findPreRow(parentData, sortedParents); // i'll find row but without way to it
    switch (rowStatus) {
      case 'next':
        // set row where index === preRow.index++
        break;
      case 'child':
        // push row to preRow.subrows where index === preRow.subrows.length
        break;
    }
    // no ideas for update indexes
  }
};

module.exports = {
  indexAll,
  create
};
