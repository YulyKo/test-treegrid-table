const JSONdb = require('simple-json-db');
const db = new JSONdb(require.resolve('../../../db.json'));

const getAll = () => {
  db.sync();
  return db.get('columns');
};

const update = (columns) => {
  db.sync();
  db.set('columns', columns);
};

module.exports = {
  getAll,
  update
};
