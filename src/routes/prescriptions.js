const express = require('express');
const controller = require('../controller/prescriptionsController');

const presRouter = express.Router();

presRouter.route('/:id').post(controller.add).get(controller.get);

module.exports = presRouter;
