const Router = require('express').Router;
const Crime = require(__dirname + '/../../model/crime');
const eH = require(__dirname + '/../lib/error_handler');
const request = require('superagent');
var adminRouter = module.exports = exports = Router();

var getAllData = function() {
  request.get('https://data.seattle.gov/resource/tn4m-tpqu.json')
    .end((err, res) => {
      if (err) {
        return eH(err);
      }
      for (var i = 0; i < res.body.length; i++) {
        var newCrime = new Crime({
          offense: res.body[i].offense_type,
          date: res.body[i].occurred_date_or_date_range_start.slice(0, 10),
          day: res.body[i].occurred_date_or_date_range_start.slice(8, 10),
          month: res.body[i].month,
          monthYr: res.body[i].occurred_date_or_date_range_start.slice(0, 7),
          year: res.body[i].year,
          time: res.body[i].occurred_date_or_date_range_start.slice(11),
          longitude: res.body[i].longitude,
          latitude: res.body[i].latitude,
          zone: res.body[i].zone_beat,
          rms_cdw_id: res.body[i].rms_cdw_id
        });
        newCrime.save( (err) => {
          if (err) {
            return eH(err);
          }
        });
      }
      console.log('all data written to DB with ' + res.body.length + ' documents');
    });
};

adminRouter.get('/admin', (req, res) => {
  getAllData();
  return res.status(200).send('data stored to DB');
});
