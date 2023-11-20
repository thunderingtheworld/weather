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
  // Idea: Would be nice to show a loading spinner
  // Idea: Would be nice to flicker the UI so users notice that it's been updated
  // Idea: For all types of errors, show red/yellow bootstrap alerts

  // Bonus points: Would be nice to add show more days
  // TODO: Decide whether doing more days or making current weather larger in UI.

  document.getElementById('weatherResultsDiv').style.display = 'block';

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
      <div class="card mb-4 box-shadow">
        <div class="card-body">
          <div class="text-left">
            <div class="card-text pb-1">
              ${data.location.name}, ${data.location.country}
            </div>
          </div>
          <h5 class="card-title">Temperature: ${data.current.temp_c}°C</h5>
          <p class="card-text">Humidity: ${data.current.humidity}%</p>
          
          <div class="d-flex justify-content-center align-items-center">
            <img 
              class="card-img" 
              alt="Current weather icon" 
              src="${data.current.condition.icon}"
            >
          </div>
          <p class="card-text text-muted">${data.current.condition.text}</p>

          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Last updated ${data.current.last_updated}</small>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // hide div with background color:
  document.getElementById('weatherResultsDiv').style.display = 'none';

  // focused input on entering page:
  document.getElementById('cityInput').focus();

  document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    getWeather();
  });
});
