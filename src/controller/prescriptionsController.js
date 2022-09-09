const Joi = require('joi');
const Prescription = require('../model/prescriptionsModel');

const get = async (req, res) => {
  try {
    const pres = await Prescription.getPres(req.params.id);
    if (pres.length) {
      res.json(pres);
    } else res.status(404).json('Perscription not found');
  } catch (error) {
    console.log('error on getting one pres ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const add = async (req, res) => {
  try {
    const pres = new Prescription(req.body.medicationId, req.body.comment);
    if (await pres.save(req.params.id)) {
      res.status(201).json('prescription successfully added to DB');
    } else {
      res.status(400);
      console.log('Error. New prescription was not created');
    }
  } catch (error) {
    console.log('error on adding prescription to DB ===', error);
    res.status(500).json({ msg: 'Error on adding data to DB.' });
  }
};

async function checkPresBody(req, res, next) {
  const presSchema = Joi.object({
    medication_id: Joi.number().integer().required(),
    pet_id: Joi.number().integer().required(),
    comment: Joi.string().min(1),
  });
  try {
    const validationResult = await presSchema.validateAsync(req.body, { abortEarly: false });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    // is error pasiusti atgal tik message dalis
    // is error nusiusti objektu masyva kuris turi field ir message
    res.status(400).json({ msg: 'bad data sent', error: error.details.map((obj) => ({ message: obj.message, fields: obj.path[0] })), type: 'validation' });
  }
}
module.exports = {
  add, get, checkPresBody,
};
