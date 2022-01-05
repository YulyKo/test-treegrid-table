const { Router } = require('express');
const { columnController } = require('../modules/Column');
const { rowController } = require('../modules/Row');

const router = new Router();

router.get('/rows', rowController.fetchAll);

router.get('/columns', columnController.fetchAll);
router.post('/columns', columnController.createOne);

module.exports = router;
