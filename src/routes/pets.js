const express = require('express');
const controller = require('../controller/petsController');

const petsRouter = express.Router();

petsRouter.get('/', controller.index);
petsRouter.post('/', controller.checkPetBody, controller.add);
petsRouter.route('/:id').get(controller.get).delete(controller.remove);

module.exports = petsRouter;
