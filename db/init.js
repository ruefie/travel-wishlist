const mongoose = require('./client');
const Country = require('../models/countryModel');

const countries = [
  { id: 1, name: 'Bhutan', alpha2Code: 'BT', alpha3Code: 'BTN' },
  { id: 2, name: 'Australia', alpha2Code: 'AU', alpha3Code: 'AUS' },
  { id: 3, name: 'Canada', alpha2Code: 'CA', alpha3Code: 'CAN' },
  { id: 4, name: 'Denmark', alpha2Code: 'DK', alpha3Code: 'DNK' },
  { id: 5, name: 'Egypt', alpha2Code: 'EG', alpha3Code: 'EGY' }
];

Country.insertMany(countries)
  .then(() => {
    console.log('Countries added');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error adding countries:', error.message);
    mongoose.connection.close();
  });
