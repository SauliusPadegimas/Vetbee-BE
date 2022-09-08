const express = require('express');
const controller = require('../controller/logsController');

const logsRouter = express.Router();

logsRouter.route('/').get(controller.index).post(controller.add);
logsRouter.route('/:id').get(controller.get);

module.exports = logsRouter;
