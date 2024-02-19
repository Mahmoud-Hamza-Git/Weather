const form = document.getElementById("form");
const input = document.getElementById("search");
const weatherContainer = document.getElementById("weather-cards");

// Listen for form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city_name = input.value;
  if (city_name) {
    getWeatherByCity(city_name);
  }
});

async function getWeatherByCity(city_name) {
  const API_key = "9ff08e0bce4744a1ac775403232109";
  const URL = "https://api.weatherapi.com/v1/current.json?";

  // Get the weather data
  const res = await fetch(`${URL}key=${API_key}&q=${city_name}`);
  const data = await res.json();

  console.log(data);
  const cardData = createCardData(data);
  showWeather(cardData);
}

// --- 🎯 HELPER FUNCTIONS 🎯 ---
// Show the weather cards
function showWeather(card) {
  weatherContainer.innerHTML = `<div class="card">
  <h3 class="city">${card.city || "paris"}</h3>
  <h2 class="temp">${card.temp || 99}</h2>
  <img src="${card.icon || "images/favicon.ico"}" alt="weather icon" class="icon" />
  <p class="description">${card.desc || "Cloudy"}</p>
</div>`;
}

// create a weather card
function createCardData({ location, current }) {
  const card = {
    city: location.name,
    temp: current.temp_c,
    icon: `${current.condition.icon}`,
    desc: current.condition.text,
  };

  return card;
}
