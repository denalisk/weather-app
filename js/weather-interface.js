var Weather = require('./../js/weather.js').weatherModule;
function displayWeather(city, weatherDescription, humidityData, temperatureData, windSpeed, cloudCover) {
  $('.showCity').text(city);
  $('.showDescription').text(weatherDescription);
  $('.showHumidity').text(humidityData + "%");
  $('.showTemperature').text(temperatureData);
  $('.showWind').text(windSpeed);
  $('.showCloudiness').text(cloudCover);
}

function generateButtons(buttonName) {
  var newButton = document.createElement('button');
  newButton.setAttribute("id", buttonName + "_btn");
  newButton.setAttribute("class", "btn btn-success past-btn");
  newButton.setAttribute("value", buttonName);
  newButton.innerHTML = buttonName;
  console.log(Weather.pastSearches);
  $("#past-searches").append(newButton);
}

$(document).ready(function() {
  var startWeather = new Weather("Seattle");
  startWeather.getWeather(displayWeather);

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    var currentWeatherObject = new Weather(city);
    currentWeatherObject.addSearch(city);
    $('.showCity').text("The city you have chosen is " + city + ".");
    currentWeatherObject.getWeather(displayWeather);
    // initMap();
    // setInterval(function(){currentWeatherObject.getWeather(displayWeather);}, 100000);
    $("#past-searches").empty();
    currentWeatherObject.getSearches(generateButtons);

    $(".past-btn").off().click(function(){
      var city = $(this).val();
      var currentWeatherObject = new Weather(city);
      $('.showCity').text("The city you have chosen is " + city + ".");
      currentWeatherObject.getWeather(displayWeather);
    });

  });


});
