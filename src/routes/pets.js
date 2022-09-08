const express = require('express');
const controller = require('../controller/petsController');

const petsRouter = express.Router();

petsRouter.route('/').get(controller.index).post(controller.add);
petsRouter.route('/:id').get(controller.get).delete(controller.remove);

module.exports = petsRouter;
