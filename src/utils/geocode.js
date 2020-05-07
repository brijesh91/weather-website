const request = require("request");

//GeoCoding
//Address -> Lat/Long -> weather

//reverse
// https://api.mapbox.com/geocoding/v5/mapbox.places/72.877426,19.076090.json?access_token=pk.eyJ1IjoiYnJpamVzaC1yYXRob2QiLCJhIjoiY2s5MmtwZm1rMDlmejNsbnM1eWd0ODB0ciJ9.motp8JfGFRVb7UIz6--ktA&limit=1

//forward
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYnJpamVzaC1yYXRob2QiLCJhIjoiY2s5MmtwZm1rMDlmejNsbnM1eWd0ODB0ciJ9.motp8JfGFRVb7UIz6--ktA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
        // longitude1: response.body.features[1].center[0],
        // latitude1: response.body.features[1].center[1],
        // location1: response.body.features[1].place_name
      });
    }
  });
};

module.exports = geocode;
