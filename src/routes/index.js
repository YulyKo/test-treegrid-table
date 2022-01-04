const { Router } = require('express');
const { taskController } = require('../modules/Tasks');

const router = new Router();

router.get('/rows', taskController.fetchAll);

module.exports = router;
