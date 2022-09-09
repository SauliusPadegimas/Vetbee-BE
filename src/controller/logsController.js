const Joi = require('joi');
const Log = require('../model/logsModel');

const index = async (req, res) => {
  try {
    const logs = await Log.getLogs();
    res.json(logs);
  } catch (error) {
    console.log('error on getting logs ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const get = async (req, res) => {
  try {
    const log = await Log.getLog(req.params.id);
    if (log.length) {
      res.json(log);
    } else res.status(404).json('Not logs found');
  } catch (error) {
    console.log('error on getting one log ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const add = async (req, res) => {
  try {
    const log = new Log(req.body.pet_id, req.body.description, req.body.status);
    if (await log.save()) {
      res.status(201).json('log successfully added to DB');
    } else {
      res.status(400);
      console.log('Error. New log was not created');
    }
  } catch (error) {
    console.log('error on adding medication to DB ===', error);
    res.status(500).json({ msg: 'Error on adding data to DB.' });
  }
};
async function checkLogsBody(req, res, next) {
  const logsSchema = Joi.object({
    pet_id: Joi.number().integer().required(),
    description: Joi.string().min(1).required(),
    status: Joi.string().min(1),
  });
  try {
    const validationResult = await logsSchema.validateAsync(req.body, { abortEarly: false });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error ===', error);
    // is error pasiusti atgal tik message dalis
    // is error nusiusti objektu masyva kuris turi field ir message
    res.status(400).json({ msg: 'bad data sent', error: error.details.map((obj) => ({ message: obj.message, fields: obj.path[0] })), type: 'validation' });
  }
}
module.exports = {
  index, add, get, checkLogsBody,
};
