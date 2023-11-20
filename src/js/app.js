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
  // Idea: Indicate that city found is nearest match to search query, not
  //    necessarily the right city.

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
        <div class="card-header p-3 bg-transparent">
          <div class="d-flex">
              <span class="flex-grow-1">
                ${data.location.name}, ${data.location.country}
              </span>
              <span>
                <small class="text-muted">
                  ${formatUSDateTime(data.current.last_updated)}
                </small>
              </span>
            </div>
        </div>

        <div class="card-body pb-5 text-center">
          <div class="d-flex justify-content-center align-items-center">
            <img 
              class="card-img" 
              alt="Current weather icon" 
              src="${data.current.condition.icon}"
            >
          </div>
          <p class="card-text text-muted">${data.current.condition.text}</p>
          <p class="card-text">Temperature: ${data.current.temp_c}°C</p>
          <p class="card-text">Humidity: ${data.current.humidity}%</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
  }
}

function formatUSDateTime(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleDateString('en-US', options);
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
