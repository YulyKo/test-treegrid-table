const { Router } = require('express');
const { columnController } = require('../modules/Column');
const { rowController } = require('../modules/Row');

const router = new Router();

router.get('/rows', rowController.fetchAll);
router.post('/rows', rowController.createOne);
router.patch('/rows', rowController.updateOne)
router.delete('/rows', rowController.deleteMany)

router.get('/columns', columnController.fetchAll);
router.post('/columns', columnController.createOne);
router.patch('/columns/:columnId', columnController.updateOne);
router.delete('/columns', columnController.deleteMany)

module.exports = router;