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
  if (!req.body.pet_id || !(req.body.description.trim()) || !(req.body.status.trim())) {
    res.status(400).json({ msg: 'Data missing' });
    return;
  }
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
module.exports = {
  index, add, get,
};
