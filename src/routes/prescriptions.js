const express = require('express');
const controller = require('../controller/prescriptionsController');

const presRouter = express.Router();

presRouter.post('/:id', controller.checkPresBody, controller.add);
presRouter.get('/:id', controller.get);

module.exports = presRouter;
