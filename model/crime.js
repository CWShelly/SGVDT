const mongoose = require('mongoose');


var crimeSchema = new mongoose.Schema({
  offense: { type: String },
  date: { type: String },
  time: { type: String },
  longitude: { type: Number },
  lattitude: { type: Number },
  zone: { type: String },
  rms_cdw_id: { type: String }
});

module.exports = mongoose.model('Crime', crimeSchema);
