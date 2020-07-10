const request = require('request');

const forecast = ({latitude, longitude} = {}, cb) => {
  // 末尾的units=f是转为华氏温度，units=m转为摄氏温度
  const url = `http://api.weatherstack.com/current?access_key=2d1dc0ffa1c151e0fd65ca1a9859d293&query=${latitude},${longitude}&units=m`;
  request({url, json: true}, (err, res) => {
    if (err) {
      cb('Unable to connect to location services!', undefined);
    } else if (res.body.error) {
      cb('Unable to find location. Try another search',undefined);
    } else {
      const {location: {name, region, country}, current: {temperature, weather_descriptions}} = res.body;
      cb(undefined, {
        location: name + ', ' + region + ', ' + country,
        temperature: temperature + '℃',
        weather: weather_descriptions[0],
      })
    }
  })
};

module.exports = forecast;