const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?"
const apiKey = "4aa9e58bea85b7557cdabbdc35a83f59"

var buttonClick = document.getElementById("search-button");
var userInput = document.getElementById("search-input")


buttonClick.addEventListener('click', handleName);

function handleName(){
  console.log(userInput.value)
  grabWeather(userInput.value)
}



function grabWeather(cityName){
  var newCityName = cityName.replaceAll(" ", "%20");
  console.log(newCityName)
  fetch(baseUrl+"q="+ newCityName+"&appid="+apiKey)
    .then(weather => {
      return weather.json()
    }).then(displayWeather)
}

function displayWeather(weather){
  console.log(weather)
}