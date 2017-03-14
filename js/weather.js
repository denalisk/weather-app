var apiKey = require('./../.env').apiKey;

function Weather(){

}

Weather.prototype.getWeather = function (city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)

  .then(function(response) {
    console.log(response);
    var celsiusTemp = response.main.temp - 273
    var windSpeed = response.wind.speed*2.23694
    displayFunction(city, response.weather[0].description, response.main.humidity, celsiusTemp, windSpeed, response.clouds.all)
  })

  .fail(function(error){
    $('.showError').text(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;
