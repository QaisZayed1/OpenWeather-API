const apiKey = 'c399600d9f43a44c2f3bb9ba52c9d598'
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResults = document.getElementById('weatherResults');

searchButton.addEventListener('click', function () {
    const input = cityInput.value.trim()
    if(!input) {
        alert('No Location Detected.')
        return;
    }

    fetchWeather(input)
})

async function fetchWeather(input) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error('Location unfound')
        const data = await response.json()
        displayWeather(data);
    } catch (error) {
        weatherResults.innerHTML = `<div class='weather-card> Error: ${error.message}</div>`
    }
}


function displayWeather(data) {
    const {name, main, weather} = data;
    weatherResults.innerHTML = `
    <div class= 'weather-card'>
    <h2>${name}</h2>
    <p>Temperature:${main.temp}°C</p>
    <p>Feels Like:${main.feels_like}°C</p>
    <p>Condition:${weather[0].description}</p>
   </div>
    `;
}


