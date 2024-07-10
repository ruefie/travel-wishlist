const {mongoose, Schema, model} = require('mongoose');


const CountrySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  alpha2Code: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 2,
  },
  alpha3Code: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 3,
  },
  visited: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false });

const Country = model('Country', CountrySchema);

module.exports = Country;
