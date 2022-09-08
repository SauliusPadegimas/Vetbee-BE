const Pet = require('../model/petsModel');

const index = async (req, res) => {
  try {
    const pets = await Pet.getPets();
    res.json(pets);
  } catch (error) {
    console.log('error on getting pets ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const get = async (req, res) => {
  try {
    const pet = await Pet.getPet(req.params.id);
    console.log('pet.length ===', pet.length);
    if (pet.length) {
      res.json(pet);
    } else res.status(404).json('Not found');
  } catch (error) {
    console.log('error on getting one pet ===', error);
    res.status(500).json({ msg: 'Error on getting data from db.' });
  }
};

const remove = async (req, res) => {
  try {
    const deletedBoolean = await Pet.delete(req.params.id);
    console.log('deletedBoolean ===', deletedBoolean);
    if (deletedBoolean) {
      res.status(200).json('pet deleted from DB');
    } else {
      res.status(400).json('Delete was not successfull');
      console.log('Error. Delete was not successfull');
    }
  } catch (error) {
    console.log('error on archiving pet ===', error);
    res.status(500).json({ msg: 'Error on deleting data from db.' });
  }
};

const add = async (req, res) => {
  if (!(req.body.name.trim()) || !req.body.dob || !(req.body.email.trim())) {
    res.status(400).json({ msg: 'data missing' });
    return;
  }
  try {
    const pet = new Pet(req.body.name, req.body.dob, req.body.email);
    if (await pet.save()) {
      res.status(201).json('pet successfully added to DB');
    } else {
      res.status(400);
      console.log('Error. New pet was not created');
    }
  } catch (error) {
    console.log('error on adding pet to DB ===', error);
    res.status(500).json({ msg: 'Error on adding data to DB.' });
  }
};
module.exports = {
  index, add, remove, get,
};
