const JSONdb = require('simple-json-db');
const db = new JSONdb(require.resolve('../../../db.json'));

const getAll = () => {
  db.sync();
  return db.get('rows');
};

const update = (rows) => {
  db.sync();
  db.set('rows', rows);
};

module.exports = {
  getAll,
  update
};
