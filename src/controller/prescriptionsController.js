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
  if (!req.body.medicationId || !(req.body.comment.trim())) {
    res.status(400).json('data missing');
    return;
  }
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
module.exports = {
  add, get,
};
