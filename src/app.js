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

// Forecast API

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `      
          <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div> 
           <div>
           <img src="img/icons/${forecastDay.weather[0].icon}.png"
            alt=""
            width="37"
            height="35"/></div>
        
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
 `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURl).then(displayForecast);
}

// Connection API

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#displayTemp");
  displayTemp.innerHTML = `${temperature}` + "°C";

  celsiusTemperature = response.data.main.temp;

  let cityNameCurrent = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityNameCurrent}`;

  let weatherDescription = response.data.weather[0].description;
  weatherDescription = weatherDescription.toUpperCase();
  let h3 = document.querySelector("#weatherDescription");
  h3.innerHTML = `${weatherDescription}`;

  let skyDescription = response.data.weather[0].main;
  let skyElement = document.querySelector("#sky");
  skyElement.innerHTML = `${skyDescription}`;

  let humidityDescription = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidityDescription}%`;

  let windDescription = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windDescription}% Km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `img/icons/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchResult");
  search(cityInputElement.value);
}

search("Cirencester");

//CurrentInformation

function showPlaceTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b6c67be58b150db2feea7b3504a35bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function navigatorActioning(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPlaceTemp);
}

//Changing Temperature Units

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#displayTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#displayTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#CTemp");
let FahrenheitLink = document.querySelector("#FTemp");
celsiusLink.addEventListener("click", showCelsius);
FahrenheitLink.addEventListener("click", showFahrenheit);

let cityFormButton = document.querySelector("#cityNameForm");
cityFormButton.addEventListener("submit", handleSubmit);

let button = document.querySelector("#buttonPin");
button.addEventListener("click", navigatorActioning);
