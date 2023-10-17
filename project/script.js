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
// Format weekday
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekday = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[weekday];
} 

// Display custom icons 
let currentIcon = document.querySelector("#current-icon");
function displayIcon(icon) {
  let currentIcon = "";
  if (icon === "01d") {
    currentIcon = "icons/sunny.svg";
  } else if (icon === "01n") {
    currentIcon = "icons/night-clear.svg";
  } else if (icon === "02d") {
    currentIcon = "icons/partly-cloudy.svg";
  } else if (icon === "02n") {
    currentIcon = "icons/n-partly-cloudy.svg";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    currentIcon = "icons/cloudy.svg";
  } else if (icon === "09d" || icon === "09n") {
    currentIcon = "icons/shower-rain.svg";
  } else if (icon === "10d") {
    currentIcon = "icons/sun-rain.svg";
  } else if (icon === "10n") {
    currentIcon = "icons/night-rain.svg";
  } else if (icon === "11d" || icon === "11n") {
    currentIcon = "icons/lightening-thunder.svg";
  } else if (icon === "13d" || icon === "13n") {
    currentIcon = "icons/snow.svg";
  } else if (icon === "50d" || icon === "50n") {
    currentIcon = "icons/fog-mist.svg";
  }

  return currentIcon;
}

// Display 5-day forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data);
  let forecastScreen = document.querySelector('#forecast-section');

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index !== 0 && index < 6) {
  forecastHTML = 
  forecastHTML +
  `
  <div class="col-2">
    <span class="weekday">${formatDay(forecastDay.dt)}</span>

    <div class="icon-section row">
      <img class="icon col-2" src="${displayIcon(forecastDay.weather[0].icon)}" 
      alt="sunny" />
    </div>

    <div class="row">
      <p class="highest-lowest col-2">${Math.round(forecastDay.temp.max)}&deg; | 
      ${Math.round(forecastDay.temp.min)}&deg;</p>
    </div>
  </div>
  `;
  }
  });
  
  forecastHTML = forecastHTML + `</div>`;  
  forecastScreen.innerHTML = forecastHTML;
} 

// Display weather
function showWeather(response) {

  console.log(response.data)
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
  currentIcon.setAttribute("src", displayIcon(response.data.weather[0].icon));
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  latitude = response.data.coord.lat;
  longitude = response.data.coord.lon;
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
  displayIcon(response);
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
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiKey = "11dab9df202899360bb60fd1da6f370e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let latitude = "";
let longitude = "";

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
