const databaseData = require('../../../db.json');

const { columns } = databaseData;

const indexAll = async (callback) => {
  const allColumns = await columns;
  return callback(null, allColumns);
};

module.exports = {
  indexAll
};
