const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=";

    console.log(url);
    request({url, json:true}, (error,{ body } = {}) => {
        //console.log(error);
        //console.log(response.body.cod);

        if(error) {
            callback('Unable to connect to weather service',undefined);
        } else if(body.cod === '400') {
            callback('Unable to find data for the provided location',undefined);
        } else {
            //console.log(response);
            callback(undefined, 'It is ' + body.weather[0].description + ' Outside.It is currently ' + body.main.temp
            + ' degrees out. Min temp will be ' + body.main.temp_min + ' degrees, And Max temp will be ' + body.main.temp_max +
             ' degrees.');
        }
    })
}


module.exports = forecast;
