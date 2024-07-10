const express = require('express');
const router = express.Router();
const {
  renderCountriesPage,
  getCountries,
  addCountry,
  getCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countriesController');
const { countryValidationRules, validate } = require('../validators/countryValidators');

// Route to render the countries page
router.get('/', renderCountriesPage);

// Route to get all countries
router.get('/api/countries', getCountries);

// Route to add a new country
router.post('/api/countries', countryValidationRules(), validate, addCountry);

// Route to get a single country by code (alpha2Code or alpha3Code)
router.get('/api/countries/:code', getCountry);

// Route to update a country by code (alpha2Code or alpha3Code)
router.put('/api/countries/:code', updateCountry);

// Route to delete a country by code (alpha2Code or alpha3Code)
router.delete('/api/countries/:code', deleteCountry);

module.exports = router;
