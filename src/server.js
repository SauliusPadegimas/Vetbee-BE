/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const testDbConnection = require('./utils/helper');
const petsRouter = require('./routes/pets');
const medicationsRouter = require('./routes/medications');
const logsRouter = require('./routes/logs');
const presRouter = require('./routes/prescriptions');

const app = express();
const PORT = 3000;
// MiddleWare
app.use(morgan('dev'));
app.use(cors());
// kad gautame request.body galetume matyti JSON atsiųstus duomenis turim įjungti JSON atkodavimą;
app.use(express.json());

// TEST DB CONNECTION
testDbConnection();

// ROUTES
app.get('/', (req, res) => res.json({ msg: 'server online' }));

app.use('/api/v1/pets', petsRouter);
app.use('/api/v1/medications', medicationsRouter);
app.use('/api/v1/logs', logsRouter);
app.use('/api/v1/prescriptions', presRouter);

app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

app.listen(PORT, () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  console.log(`Server is listening to port: ${PORT}`.cyan.bold));
