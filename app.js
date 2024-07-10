const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/client');
const countriesRouter = require('./routes/countriesRouter');
const Country = require('./models/countryModel'); // Import Country model

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const initialCountries = [
  { id: 1, name: 'Bhutan', alpha2Code: 'BT', alpha3Code: 'BTN', visited: false },
  { id: 2, name: 'Japan', alpha2Code: 'JP', alpha3Code: 'JPN', visited: false },
  { id: 3, name: 'Canada', alpha2Code: 'CA', alpha3Code: 'CAN', visited: false },
  { id: 4, name: 'Australia', alpha2Code: 'AU', alpha3Code: 'AUS', visited: false },
  { id: 5, name: 'Italy', alpha2Code: 'IT', alpha3Code: 'ITA', visited: false },
];

const addInitialCountries = async () => {
  try {
    const count = await Country.countDocuments();
    if (count === 0) {
      await Country.insertMany(initialCountries);
      console.log('Initial countries added to the database');
    }
  } catch (err) {
    console.error('Error adding initial countries:', err.message);
  }
};

addInitialCountries();

app.use('/', countriesRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Travel Wishlist' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
