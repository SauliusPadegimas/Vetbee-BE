const Joi = require('joi');
const Medication = require('../model/medicationsModel');

const index = async (req, res) => {
  try {
    const meds = await Medication.getMedications();
    res.json(meds);
  } catch (error) {
    console.log('error on getting pets ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const get = async (req, res) => {
  try {
    const med = await Medication.getMedication(req.params.id);
    if (med.length) {
      res.json(med);
    } else res.status(404).json('Not found');
  } catch (error) {
    console.log('error on getting one pet ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const add = async (req, res) => {
  try {
    const med = new Medication(req.body.name, req.body.description);
    if (await med.save()) {
      res.status(201).json('medication successfully added to DB');
    } else {
      res.status(400);
      console.log('Error. New medication was not created');
    }
  } catch (error) {
    console.log('error on adding medication to DB ===', error);
    res.status(500).json({ msg: 'Error on adding data to DB.' });
  }
};

async function checkMedsBody(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(1),
  });
  try {
    const value = await schema.validateAsync(req.body, { abortEarly: false });
    console.log('value ===', value);
    next();
  } catch (error) {
    res.status(400).json({ msg: 'bad data sent', error: error.details.map((obj) => ({ message: obj.message, fields: obj.path[0] })), type: 'validation' });
  }
}

module.exports = {
  index, add, get, checkMedsBody,
};
