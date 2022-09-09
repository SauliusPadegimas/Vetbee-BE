const express = require('express');
const controler = require('../controller/medicationsController');

const medicationsRouter = express.Router();

medicationsRouter.get('/', controler.index);
medicationsRouter.post('/', controler.checkMedsBody, controler.add);
medicationsRouter.get('/:id', controler.get);

module.exports = medicationsRouter;
