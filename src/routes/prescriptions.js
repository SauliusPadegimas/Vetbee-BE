const express = require('express');
const controller = require('../controller/prescriptionsController');

const presRouter = express.Router();

presRouter.post('/:id', controller.checkPresBody, controller.get);
presRouter.get('/:id', controller.get);

module.exports = presRouter;
