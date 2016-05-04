const mongoose = require('mongoose');


var crimeSchema = new mongoose.Schema({
  offense: { type: String },
  date: { type: String },
  day: { type: Number },
  month: { type: Number },
  monthYr: { type: String },
  year: { type: Number },
  time: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  zone: { type: String },
  rms_cdw_id: { type: String }
});

module.exports = mongoose.model('Crime', crimeSchema);
