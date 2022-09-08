const express = require('express');
const controler = require('../controller/medicationsController');

const medicationsRouter = express.Router();

medicationsRouter.route('/').get(controler.index).post(controler.add);
medicationsRouter.get('/:id', controler.get);

module.exports = medicationsRouter;
