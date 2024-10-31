const apiKey = "175b050f786b7daf09fa9bade681a07f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputBox = document.querySelector("#inputBox");

// Load saved weather data on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("weatherData"));
    if (savedData) {
        displayWeather(savedData);
    }
});

inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        checkWeather(inputBox.value);
        inputBox.value = "";
    }
});

async function checkWeather(cityName) {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    const errorElement = document.querySelector(".error");
    if (response.status >= 400 && response.status < 600) {
        errorElement.style.display = "block";
        document.querySelector(".error p").innerHTML = "Invalid city name or bad request";
        return;
    } else {
        errorElement.style.display = "none";
    }

    const data = await response.json();
    displayWeather(data);

    // Save data to localStorage
    localStorage.setItem("weatherData", JSON.stringify(data));
}

function displayWeather(data) {
    const city = document.querySelector(".city");
    city.innerHTML = data.name;

    const temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(data.main.temp) + "°C";

    const humidity = document.querySelector(".humidity");
    humidity.innerHTML = data.main.humidity + "%";

    const wind = document.querySelector(".wind");
    wind.innerHTML = data.wind.speed + " km/h";

    const weatherIcon = document.querySelector(".weather-icon");
    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "mist.png";
    }
}

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = "";
});
