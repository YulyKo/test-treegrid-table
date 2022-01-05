const { Router } = require('express');
const { columnController } = require('../modules/Column');
const { rowController } = require('../modules/Row');

const router = new Router();

router.get('/rows', rowController.fetchAll);

router.get('/columns', columnController.fetchAll);

module.exports = router;
