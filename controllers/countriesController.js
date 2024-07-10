const Country = require('../models/countryModel');
const { validationResult } = require('express-validator');

const renderCountriesPage = async (req, res) => {
  try {
    const countries = await Country.find({}).select('-_id -__v').sort({ id: 1 });
    res.render('index', { countries });
  } catch (err) {
    console.error('Error rendering countries page:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET all countries
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().select('-_id -__v').sort({ id: 1 });
    res.json(countries);
  } catch (err) {
    console.error('Error fetching countries:', err.message);
    res.status(500).send('Server Error');
  }
};

// POST add new country
const addCountry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, alpha2Code, alpha3Code } = req.body;

  try {
    let lastCountry = await Country.findOne().sort({ id: -1 });
    let newId = lastCountry ? lastCountry.id + 1 : 1;

    let country = await Country.findOne({ $or: [{ alpha2Code }, { alpha3Code }] });
    if (country) {
      return res.status(400).json({ errors: [{ msg: 'Country already exists' }] });
    }

    country = new Country({
      id: newId,
      name,
      alpha2Code,
      alpha3Code,
    });

    await country.save();
    res.json(country);
  } catch (err) {
    console.error('Error adding country:', err.message);
    res.status(500).send('Server Error');
  }
};

const getCountry = async (req, res) => {
  const code = req.params.code;

  try {
    const country = await Country.findOne({ $or: [{ alpha2Code: code }, { alpha3Code: code }] }).select('-_id -__v').sort({ id: 1 });
    if (!country) {
      return res.status(404).json({ errors: [{ msg: 'Country not found' }] });
    }
    res.json(country);
  } catch (err) {
    console.error('Error fetching country:', err.message);
    res.status(500).send('Server Error');
  }
};

const updateCountry = async (req, res) => {
  const code = req.params.code;
  const { visited } = req.body;

  try {
    let country = await Country.findOne({ $or: [{ alpha2Code: code }, { alpha3Code: code }] });
    if (!country) {
      return res.status(404).json({ errors: [{ msg: 'Country not found' }] });
    }

    country.visited = visited;

    await country.save();
    res.json(country);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteCountry = async (req, res) => {
  const code = req.params.code;

  try {
    const country = await Country.findOneAndDelete({ $or: [{ alpha2Code: code }, { alpha3Code: code }] });
    if (!country) {
      return res.status(404).json({ errors: [{ msg: 'Country not found' }] });
    }
    res.json({ message: 'Country deleted' });
  } catch (err) {
    console.error('Error deleting country:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  renderCountriesPage,
  getCountries,
  addCountry,
  getCountry,
  updateCountry,
  deleteCountry,
};
