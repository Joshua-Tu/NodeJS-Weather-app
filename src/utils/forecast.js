require('dotenv').config();
const request = require('request');

const forecast = ({latitude, longitude} = {}, cb) => {
  // 末尾的units=f是转为华氏温度，units=m转为摄氏温度
  const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_TOKEN}&query=${latitude},${longitude}&units=m`;
  request({url, json: true}, (err, res) => {
    if (err) {
      cb('Unable to connect to location services!', undefined);
    } else if (res.body.error) {
      cb('Unable to find location. Try another search',undefined);
    } else {
      const {location: {name, region, country}, current: {temperature, weather_descriptions, humidity, feelslike, uv_index}} = res.body;
      cb(undefined, {
        location: name + ', ' + region + ', ' + country,
        temperature: temperature + '℃',
        weather: weather_descriptions[0],
        humidity,
        feelslike,
        uvIndex: uv_index,
      })
    }
  })
};

module.exports = forecast;
