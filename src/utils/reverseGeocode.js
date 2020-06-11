const request = require('request');

const reverseGeocode = (longitude,latitude,callback) => {
    // console.log(longitude,latitude);
    const revURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude) + ".json?access_token=pk.eyJ1IjoiYnJpamVzaC1yYXRob2QiLCJhIjoiY2s5MmtwZm1rMDlmejNsbnM1eWd0ODB0ciJ9.motp8JfGFRVb7UIz6--ktA&limit=1"
    // console.log(revURL);
    request({url: revURL, json:true}, (error,response) => {
        if(error) {
            callback('Unable to connect to location service',undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find it. Please try once more.',undefined);
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name
            });
        }
    })
}

//if longitude latitude are sent empty, they are considered 0 and 0. Coma separated them and there's no chance for comma to disapper.
// else if(!response.body.features){
//     callback('Unable to locate it. Please enter valid entries.',undefined);
// } 

module.exports = reverseGeocode;