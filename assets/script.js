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
  fetch(baseUrl+"q="+ newCityName+"&appid="+apiKey)
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
 fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+weather[0].lat+"&lon="+weather[0].lon+"&appid="+apiKey+"&units=imperial")
 .then(res => {
  return res.json()
  
 }) .then(data => {
  console.log(data)
  var cityWeather = document.createElement("p")
  cityWeather.textContent = "temperature: "+data.list[0].main.temp
  todaySection.appendChild(cityWeather)
  for (var i = 0; i < data.list.length; i+= 7) {
  console.log(data.list[i])
  // var cityWeather = document.createElement("p")
  // cityWeather.textContent = data.list[i].main.temp
  
  }
 })
}

