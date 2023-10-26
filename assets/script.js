const baseUrl = "https://api.openweathermap.org/geo/1.0/direct?"
const apiKey = "4aa9e58bea85b7557cdabbdc35a83f59"

var buttonClick = document.getElementById("search-button");
var userInput = document.getElementById("search-input")


buttonClick.addEventListener('click', handleName);

function handleName(event){
  event.preventDefault()
  console.log(userInput.value)
  grabWeather(userInput.value)
}



function grabWeather(cityName){
  var newCityName = cityName.replaceAll(" ", "%20");
  console.log(newCityName)
  
  
  fetch(baseUrl+"q="+ newCityName+"&limit=1&appid="+apiKey)
    .then(weather => {
      return weather.json()
    }).then(displayWeather)
}



function displayWeather(weather){
  console.log(weather)
 var todaySection = document.querySelector("#today")
 var cityTitle = document.createElement("h1")
 cityTitle.textContent = weather[0].name
 todaySection.appendChild(cityTitle)

 var forecastSection = document.querySelector("#forecast");

 fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+weather[0].lat+"&lon="+weather[0].lon+"&appid="+apiKey+"&units=imperial")
 .then(res => {
  return res.json()
  
 }) .then(data => {
  console.log(data)
  var cityWeather = document.createElement("p")
  cityWeather.textContent = "Todays temperature: "+data.list[0].main.temp
  todaySection.appendChild(cityWeather)
  for (var i = 0; i < data.list.length; i += 8) {
    var forecastData = data.list[i];
    var date = new Date(forecastData.dt * 1000);
    var day = date.toDateString().split(" ")[0];

    var forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    var dayElement = document.createElement("p");
    dayElement.textContent = day;
    forecastItem.appendChild(dayElement);

    var tempElement = document.createElement("p");
    tempElement.textContent = "Temperature: " + forecastData.main.temp + "°F";
    forecastItem.appendChild(tempElement);

    var descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Description: " + forecastData.weather[0].description;
    forecastItem.appendChild(descriptionElement);

    forecastSection.appendChild(forecastItem);
  
  }
 })
}

