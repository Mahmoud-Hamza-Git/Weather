const form = document.getElementById("form");
const input = document.getElementById("search");
const weatherContainer = document.getElementById("weather-cards");
const loadingMsg = document.querySelector(".loading");
const errorMsg = document.querySelector(".error");

// Listen for form submit and get the weather data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city_name = input.value;
  getWeatherByCity(city_name);
});

// Remove the error message when the user starts typing
input.addEventListener("keydown", () => {
  errorMsg.classList.remove("active");
});

// -------------------------------
// ---  HELPER FUNCTIONS  ---
// -------------------------------
async function getWeatherByCity(city_name) {
  const API_key = "9ff08e0bce4744a1ac775403232109";
  const URL = "https://api.weatherapi.com/v1/current.json?";
  input.value = ""; // Clear the input field
  loadingMsg.classList.add("active"); // Show the loading msg

  try {
    const res = await fetch(`${URL}key=${API_key}&q=${city_name}`);
    const data = await res.json();
    const { error } = data;
    if (error) {
      errorMsg.innerHTML = error.message;
      throw new Error(error);
    } else {
      const cardData = createCardData(data);
      showCard(cardData);
      addFlipCardEvent();
    }
  } catch (err) {
    errorMsg.classList.add("active"); // Show the error msg
  } finally {
    loadingMsg.classList.remove("active"); // Hide the loading msg
  }
}

// create a weather card
function createCardData({ location, current }) {
  if (!location || !current) return;
  const card = {
    city: location.name,
    temp: current.temp_c,
    icon: current.condition.icon,
    desc: current.condition.text,
    country: location.country,
    date: location.localtime.split(" ")[0],
    time: location.localtime.split(" ")[1],
  };
  return card;
}

// Show the weather cards
function showCard(card) {
  if (!card) return;
  weatherContainer.innerHTML = `<div class="card-wrapper">
    <div class="card-flip">
      <div class="card front-face">
        <h3 class="city">${card.city}</h3>
        <h2 class="temp">${card.temp}</h2>
        <img src="${card.icon}" alt="weather icon" class="icon" />
        <p class="desc">${card.desc}</p>
      </div>
      <div class="card back-face">
        <h3 class="country">${card.country}</h3>
        <p class="desc">${card.date}</p>
        <p class="desc">${card.time}</p>
      </div>
    </div>
  </div>`;
}

// Add flip card event
function addFlipCardEvent() {
  const card = document.querySelector(".card-flip");
  card.addEventListener("click", () => {
    card.classList.toggle("flip");
  });
}

// --- Future Features --- //
// 1. Add a button to show info about the site in a modal
// 2. change the theme of the site based on the day or night
// 3. add history to last 10 cities searched
