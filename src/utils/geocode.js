require('dotenv').config();
const request = require('request');

const geocode = (address, cb) =>  {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${process.env.GEOCODE_TOKEN}&limit=1`;
  // {body: {features}} 就是把response给提前destructuring了
  request({url, json: true}, (err, {body: {features = {}}} = {}) => {
    if (err) {
      cb('Unable to connect to location services!', undefined);
    } else if (features.length === 0) {
      cb('Unable to find location. Try another search', undefined);
    } else {
      const { center: coordinates, place_name } = features[0]
      cb(undefined, {
        latitude: coordinates[1],
        longitude: coordinates[0],
        location: place_name,
      });
    }
  })
}

module.exports = geocode;
