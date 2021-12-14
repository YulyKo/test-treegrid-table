const databaseData = require('../../../db.json');

const indexAll = async callback => {
  const allTasks = await databaseData.allTasks;
  return callback(null, allTasks);
};

module.exports = {
  indexAll
};
