var apiKey = require('./../.env').apiKey;

function Weather(city){
  this.city = city;
  this.weather;
  this.temp;
  this.humidity;
  this.windSpeed;
  this.cloudiness;
}

Weather.prototype.getWeather = function (displayFunction) {
  var current = this;
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + current.city + '&appid=' + apiKey)

  .then(function(response) {
    console.log(response);
    var temp = response.main.temp - 273;
    var windSpeed = response.wind.speed*2.23694;
    var weather = response.weather[0].description;
    var humidity = response.main.humidity;
    var cloudiness = response.clouds.all;
    displayFunction(current.city, weather, humidity, temp, windSpeed, cloudiness)
  })

  .fail(function(error){
    $('.showError').text(error.responseJSON.message);
  });
};

Weather.prototype.returnWeather = function(displayFunction){
  var current = this;
  console.log("In returnWeather the object is ");
  console.log(current);
  displayFunction(current.city, current.weather, current.humidity, current.temp, current.windSpeed, current.cloudiness);
};

Weather.prototype.updateWeather = function(displayFunction) {
  var current = this;
  current.getWeather(displayFunction).then(current.returnWeather(displayFunction));
};


exports.weatherModule = Weather;
