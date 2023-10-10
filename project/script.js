let date = new Date();
let day = date.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[day];
let displayTime = document.querySelector("#display-time");

let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentHour = date.getHours();
if (currentHour > 12) {
  currentHour -= 12;
  let currentTime = `${currentHour}:${currentMinutes}` + "PM";
  displayTime.innerHTML = `${currentDay} ${currentTime}`;
} else if (currentHour === 12) {
  let currentTime = `${currentHour}:${currentMinutes}` + "PM";
  displayTime.innerHTML = `${currentDay} ${currentTime}`;
} else {
  let currentTime = `${currentHour}:${currentMinutes}` + "AM";
  displayTime.innerHTML = `${currentDay} ${currentTime}`;
}

// Display 5-day forecast
function displayForecast() {
  let forecastScreen = document.querySelector('#forecast-section');
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu"];
  days.forEach(function(day) {
  forecastHTML = 
  forecastHTML +
  `
  <div class="col-2">
    <span class="weekday">${day}</div>

    <div class="icon-section row">
      <img class="icon col-2" src="icons/sunny.svg" alt="sunny" />
    </div>

    <div class="row">
      <p class="highest-lowest col-2">19&deg; | 10&deg;</p>
    </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;  
  forecastScreen.innerHTML = forecastHTML;
  console.log(forecastHTML);
} 

// Display weather
function showWeather(response) {
  let currentCity = document.querySelector("#current-city");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  console.log(response.data.name);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML = response.data.weather[0].description;
  console.log(weatherStatus);
  let windStatus = document.querySelector("#wind-status");
  windStatus.innerHTML = `wind: ${response.data.wind.speed} m/s`;
  console.log(windStatus);
  let humidityStatus = document.querySelector("#humidity-status");
  humidityStatus.innerHTML = `humidity: ${response.data.main.humidity}%`;

}
// Search for a city
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML =
    city.value.charAt(0).toUpperCase() + city.value.slice(1);

  let apiKey = "11dab9df202899360bb60fd1da6f370e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", searchCity);

// Get current location on load

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "11dab9df202899360bb60fd1da6f370e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);

// Get current location on click
function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

// Convert to Celsius & Fahrenheit
function toFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = Math.round(celsiusTemperature * 1.8) + 32;
  currentTemperature.innerHTML = `${fahrenheitTemperature}`;
}

function toCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#convert-celsius");
celsiusLink.addEventListener("click", toCelsius);

let fahrenheitLink = document.querySelector("#convert-fahrenheit");
fahrenheitLink.addEventListener("click", toFahrenheit);

displayForecast();
