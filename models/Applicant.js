const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Applicant = new Schema({

  name: {
    type: String,
    required: true
  },
  coolProb: {
    type: String,
    required: true
  },
  designDesc: {
    type: String,
    required: true
  },
  dreamEnv: {
    type: String,
    required: true
  }
})

const applicant = mongoose.model('applicant', Applicant, 'applicant');

module.exports = applicant;
