// Load Styles
import "../scss/styles.scss";

// Load Bootstrap init
import { initBootstrap } from "./bootstrap.js";

// Loading bootstrap with optional features, just in case 
// I'll need them (speed over perfection in this case):
initBootstrap({
  tooltip: true,
  popover: true,
  toasts: true,
});

async function displayWeatherForCity() {
  // Idea: Would be nice to show a loading spinner
  // Idea: Would be nice to flicker the UI so users notice that it's been updated
  // Idea: Indicate that city found is nearest match to search query, not
  //    necessarily the right city.
  // Bonus points: Would be nice to add more days. Not doing.

  document.getElementById('weatherResultsDiv').style.display = 'block';

  const cityInput = document.getElementById("cityInput");
  const weatherTodayInfo = document.getElementById("weatherTodayInfo");

  const city = cityInput.value;
  if (!city) {
    // Would fix if had time: Alerts are not nice user experience
    // in my opinion... Would prefer alternative method.
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

    weatherTodayInfo.innerHTML = `
      <div class="card mb-4 box-shadow">
        <div class="card-header p-3 bg-transparent">
          <div class="d-flex">
              <span 
                id="location-span"
                class="flex-grow-1"
              >
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
      </div>`;
  } catch (error) {
    weatherTodayInfo.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Error fetching weather data: ${error.message}
      </div>`;
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
    displayWeatherForCity();
  });
});
