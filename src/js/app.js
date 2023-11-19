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

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var submitCityButton = document.getElementById("submitCity");

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
        throw new Error("City not found");
      }

      const data = await response.json();

      weatherInfo.innerHTML = `
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Humidity: ${data.current.humidity}%</p>

      <!-- Add logic to display weather icon -->
    `;
    } catch (error) {
      weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
  }

  // Add an event listener to the button
  submitCityButton.addEventListener("click", function () {
    // Call the getWeather function when the button is clicked
    getWeather();
  });
});
