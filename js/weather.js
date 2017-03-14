var apiKey = require('./../.env').apiKey;

function Weather(city){
  var currentWeather = this;
  this.city = city;
  this.weather = "";
  this.temp = "";
  this.humidity = "";
  this.windSpeed = "";
  this.cloudiness = "";
}

Weather.prototype.getWeather = function (displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&appid=' + apiKey)

  .then(function(response) {
    console.log(response);
    currentWeather.temp = response.main.temp - 273;
    currentWeather.windSpeed = response.wind.speed*2.23694;
    currentWeather.weather = response.weather[0].description;
    currentWeather.humidity = response.main.humidity;
    currentWeather.cloudiness = response.clouds.all;
    console.log(currentWeather);
  })

  .then(this.returnWeather(displayFunction))

  .fail(function(error){
    $('.showError').text(error.responseJSON.message);
  });
};

Weather.prototype.returnWeather = function(displayFunction){
  console.log("diaplay");
  displayFunction(this.city, this.weather, this.humidity, this.temp, this.windSpeed, this.cloudiness);
};

Weather.prototype.updateWeather = function(displayFunction) {
  console.log("Tick");
  this.getWeather(displayFunction);
  // this.returnWeather(displayFunction);
}


exports.weatherModule = Weather;
