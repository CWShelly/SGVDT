const Router = require('express').Router;
const Crime = require(__dirname + '/../../model/crime');
const eH = require(__dirname + '/../lib/error_handler');
const request = require('superagent');
var dailyRouter = module.exports = exports = Router();

var yesterday = {
  date: new Date(Date.now() - 8.64e+7),
  day: (new Date(Date.now() - 8.64e+7)).getDate(),
  month: (new Date(Date.now() - 8.64e+7)).getMonth() + 1,
  year: (new Date(Date.now() - 8.64e+7)).getFullYear()
};

var dayBefore = {
  date: new Date(Date.now() - 1.728e+8),
  day: (new Date(Date.now() - 1.728e+8)).getDate(),
  month: (new Date(Date.now() - 1.73e+8)).getMonth() + 1,
  year: (new Date(Date.now() - 1.73e+8)).getFullYear()
};

var dailyData = function() {
  request.get('https://data.seattle.gov/resource/tn4m-tpqu.json?month=' + '4' + '&year=' + '2016')
    .end((err, res) => {
      if (err) {
        return eH(err);
      }
      dailyUpdateArray = [];
      console.log('body = ', res.body);
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
          console.log(res.body[i].occurred_date_or_date_range_start.slice(0, 7));


        dailyUpdateArray.push(newCrime);
      }


      for (var j = 0; j < dailyUpdateArray.length; j++) {
        // console.log('gonna get ', dailyUpdateArray[j].rms_cdw_id );
        Crime.find({
          rms_cdw_id: dailyUpdateArray[j].rms_cdw_id
        }, (err, data) => {
        //   console.log('data = ', data);
        //   console.log('about to save ', dailyUpdateArray[j] );
          if (!data) {
            dailyUpdateArray[j].save((err, data) => {
              if (err) {
                return eH(err);
              }
            });
          }
        });
      }

    //   console.log(dailyUpdateArray.length);
      console.log('Today\'s data is in the array');
    });
};
setInterval(() => {
  dailyData();
  console.log('getting data');
}, 4000);
