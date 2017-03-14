var Weather = require('./../js/weather.js').weatherModule;
function displayWeather(city, weatherDescription, humidityData, temperatureData, windSpeed, cloudCover) {
  $('.showCity').text(city);
  $('.showDescription').text(weatherDescription);
  $('.showHumidity').text(humidityData + "%");
  $('.showTemperature').text(temperatureData);
  $('.showWind').text(windSpeed);
  $('.showCloudiness').text(cloudCover);
}

$(document).ready(function() {
  var currentWeatherObject = new Weather();

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('.showCity').text("The city you have chosen is " + city + ".");
    currentWeatherObject.getWeather(city, displayWeather);
  });

  $("#currentTemperature").click(function() {
    var city = $('#location').val();


  })
});
