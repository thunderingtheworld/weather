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

/* 
runSearch() searches for the weather in a city of a user's choosing

Improvement ideas for this runSearch() function below:
- Would be nice to show a loading spinner
- Would be nice to flicker the UI so users notice that it's been updated
- Indicate that city found is nearest match to search query, 
  not necessarily the right city. Especially if much difference 
  between city name of search result and in search input.
- Bonus points: Would be nice to add more days.
*/
async function runSearch() {
  // show wrapper:
  document.getElementById('searchResultsWrapper').style.display = 'block';

  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;
  if (!city) {
    // If city input is empty we display an error message
    displayError("Please enter a city name.");
    return;
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // successful search so we show result:
    displaySearchResult(data);
  } catch (error) {
    const errorMessage = `Error fetching weather data: ${error.message}`;
    displayError(errorMessage);
  }
} 

// shows the search result: weather today in a specific city
function displaySearchResult(data) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = `
    <div class="card mb-4 box-shadow">
      <div class="card-header p-3 bg-transparent">
        <div class="d-flex">
            <span 
              id="location-span"
              class="flex-grow-1"
            >
              <strong>${data.location.name}</strong>
            </span>
            <span>
              <small class="text-muted">
                ${data.location.country}
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
        <p class="card-text"><i>${data.current.condition.text}</i></p>
        <p class="card-text">
          Temperature: <strong>${data.current.temp_c}°C</strong>
        </p>
        <p class="card-text">Humidity: ${data.current.humidity}%</p>
      </div>

      <div class="card-footer p-3 bg-transparent">
        <small class="text-muted">
          Last updated: ${formatUSDateTime(data.current.last_updated)} local time
        </small>
      </div>
    </div>
  `;
}

function displayError(error) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${error}
    </div>`;
}

function formatUSDateTime(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true };
  return date.toLocaleDateString('en-US', options);
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // hide div with background color:
  document.getElementById('searchResultsWrapper').style.display = 'none';
  // focused input on entering page:
  document.getElementById('cityInput').focus();

  // Would fix if had time: Function seems to run twice instead of once:
  document.getElementById('citySearchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    runSearch();
    // Alternatively we could rename from "runSearch" to "lookupWeatherInCity"
    // And then we could refactor for readability so lookupWeatherInCity() 
    // returns result or error, and we have code here to display those
    // instead of lookupWeatherInCity() calling display functions itself
  });
});
