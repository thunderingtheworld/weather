console.log("app.js has been transpiled");

// Load Styles
import "../scss/styles.scss";

// Load Bootstrap init
import { initBootstrap } from "./bootstrap.js";

// Loading bootstrap with optional features
initBootstrap({
  tooltip: true,
  popover: true,
  toasts: true,
});


async function getWeather() {
  console.log("getWeather called");

  const cityInput = document.getElementById("cityInput");
  const weatherInfo = document.getElementById("weatherInfo");

  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // TODO: Add more error handling
      // Implement basic error handling for cases like invalid city names or API failures.
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log(data);

    weatherInfo.innerHTML = `
    <img src="${data.current.condition.icon}">
    <p><i>${data.current.condition.text}</i></p>
    <p>Temperature: ${data.current.temp_c}°C</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p><small>Information last updated at: ${data.current.last_updated}</small></p>
  `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // focused input on entering page:
  document.getElementById('cityInput').focus();

  document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    getWeather();
  });
});
