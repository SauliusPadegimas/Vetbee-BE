const express = require('express');
const controller = require('../controller/logsController');

const logsRouter = express.Router();

logsRouter.get('/', controller.index);
logsRouter.post('/', controller.checkLogsBody, controller.add);
logsRouter.route('/:id').get(controller.get);

module.exports = logsRouter;
