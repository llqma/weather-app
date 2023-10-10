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

// Display weather
function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  console.log(response.data.name);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
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

// Get current location

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

/*// Convert to Celsius & Fahrenheit
function toFahrenheit(event) {
  event.preventDefault();
  alert("fahrenheit");

  currentTemperature.innerHTML = `${Math.round(17 * 1.8) + 32}°`;
}

function toCelsius(event) {
  event.preventDefault();
  currentTemperature.innerHTML = "17";
  alert(`celsius`);
}

let celsiusTemp = document.querySelector("#convert-celsius");
celsiusTemp.addEventListener("click", toCelsius);

let fahrenheitTemp = document.querySelector("#convert-fahrenheit");
fahrenheitTemp.addEventListener("click", toFahrenheit);*/
