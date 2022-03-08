// Days Date setUp

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

let newDate = document.querySelector("#currentDate");
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

newDate.innerHTML = `${day} ${hour}: ${minutes}`;

// Connection API

function showTemperatureName(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#displayTemp");
  displayTemp.innerHTML = `${temperature}`;

  let cityNameCurrent = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityNameCurrent}`;

  let weatherDescription = response.data.weather[0].description;
  weatherDescription = weatherDescription.toUpperCase();
  let h3 = document.querySelector("#weatherDescription");
  h3.innerHTML = `${weatherDescription}`;
}

function connectionPoint(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName");
  let cityResult = document.querySelector("#searchResult");
  city.innerHTML = cityResult.value;
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureName);
}

//StartingTempNameCirencester
function StartingTemp(position) {
  let Cirenlatitude = 51.7197711;
  let Cirenlongitude = -1.9648097;
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${Cirenlatitude}&lon=${Cirenlongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureName);
}
StartingTemp();

//CurrentInformation

function showPlaceTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureName);
}

function navigatorActioning(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPlaceTemp);
}

function showCelsius(event) {
  event.preventDefault();

  let displayTemp = document.querySelector("#displayTemp");
  displayTemp.innerHTML = 100;
}

function showFahrenheit(event) {
  event.preventDefault();
  let displayTempTwo = document.querySelector("#displayTemp");
  displayTempTwo.innerHTML = (100 * 9) / 5 + 32;
}

let celciusLink = document.querySelector("#CTemp");
let FahrenheitLink = document.querySelector("#FTemp");
celciusLink.addEventListener("click", showCelsius);
FahrenheitLink.addEventListener("click", showFahrenheit);

let cityFormButton = document.querySelector("#cityNameForm");
cityFormButton.addEventListener("submit", connectionPoint);

let button = document.querySelector("#buttonPin");
button.addEventListener("click", navigatorActioning);
