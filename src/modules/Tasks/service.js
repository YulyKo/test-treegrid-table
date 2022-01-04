const databaseData = require('../../../db.json');

const indexAll = async (callback) => {
  const allRows = await databaseData.rows;
  return callback(null, allRows);
};

const create = async (rowStatus, body) => {};

module.exports = {
  indexAll,
  create
};
