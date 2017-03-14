var apiKey = require('./../.env').apiKey;

function Weather(city){
  this.city = city;
  // this.weather;
  // this.temp;
  // this.humidity;
  // this.windSpeed;
  // this.cloudiness;
}

Weather.pastSearches = [];

Weather.prototype.addSearch = function(newSearch) {
  Weather.pastSearches.push(newSearch);
};

Weather.prototype.getSearches = function(divFunction) {
  for(var index = 0; (index < Weather.pastSearches.length && index < 5); index++) {
    divFunction(Weather.pastSearches[index]);
    console.log("looping");
  }
};

Weather.prototype.getWeather = function (displayFunction) {
  var current = this;
  // console.log('http://api.openweathermap.org/data/2.5/weather?q=' + current.city + '&appid=' + apiKey);
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + current.city + '&appid=' + apiKey)

  .then(function(response) {
    var temp = response.main.temp - 273;
    var windSpeed = response.wind.speed*2.23694;
    var weather = response.weather[0].description;
    var humidity = response.main.humidity;
    var cloudiness = response.clouds.all;
    // $("#lat").val(response.coord.lat);
    // $("#long").val(response.coord.lon);
    displayFunction(current.city, weather, humidity, temp, windSpeed, cloudiness);
    current.initMap(response.coord.lat, response.coord.lon);
  })

  .fail(function(error){
    $('.showError').text(error.responseJSON.message);
  });
};

Weather.prototype.initMap = function(lat, long) {
  var position = {lat: parseFloat(lat), lng: parseFloat(long)};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: position
  });
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
};

// Weather.prototype.returnWeather = function(displayFunction){
//   var current = this;
//   console.log("In returnWeather the object is ");
//   console.log(current);
//   displayFunction(current.city, current.weather, current.humidity, current.temp, current.windSpeed, current.cloudiness);
// };
//
// Weather.prototype.updateWeather = function(displayFunction) {
//   var current = this;
//   current.getWeather(displayFunction).then(current.returnWeather(displayFunction));
// };


exports.weatherModule = Weather;
