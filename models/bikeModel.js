const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  images: [String],
  bikename: {
    type: String,
    required: [true, 'Please Tell us your name'],
  },
  year: {
    type: Number,
  },
  ownername: {
    type: String,
    required: [true, 'need wner name'],
  },
  contactnumber: {
    type: Number,
    required: [true, 'Need contact numbr'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  location: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
  bikeprice: {
    type: Number,
    required: [true, 'State bike price'],
  },
  bikenumber: {
    type: String,
    required: [true, 'State bike no.'],
    unique: true,
  },
  description: {
    type: String,
  },
});

const Bikes = mongoose.model('Bikes', bikeSchema);
module.exports = Bikes;
