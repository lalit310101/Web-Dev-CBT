document.getElementById('search-button').addEventListener('click', function() {
    var city = document.getElementById('city-input').value;
    if (city.trim() === '') {
        alert('Please enter a city name');
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    var apiKey = 'ec4bc65154eaba807c1aba7ec7fd3d9d'; // Replace with your API key
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    })
    .then(data => {
        displayWeather(data);
        fetchForecast(city);
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
        alert('City not found. Please enter a valid city name.');
    });
}

function fetchForecast(city) {
    var apiKey = 'ec4bc65154eaba807c1aba7ec7fd3d9d'; // Replace with your API key
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        return response.json();
    })
    .then(data => {
        displayForecast(data);
    })
    .catch(error => {
        console.error('Error fetching forecast data:', error);
    });
}

function displayWeather(data) {
    var cityElement = document.querySelector('.city');
    var tempElement = document.querySelector('.temp');
    var descElement = document.querySelector('.description');
    var humidityElement = document.querySelector('.humidity');
    var windElement = document.querySelector('.wind');
    var cloudImage = document.querySelector('.cloud img');

    cityElement.textContent = data.name;
    tempElement.textContent = 'Temperature: ' + Math.round(data.main.temp - 273.15) + '°C';
    descElement.textContent = 'Weather: ' + data.weather[0].description;
    humidityElement.textContent = 'Humidity: ' + data.main.humidity + '%';
    windElement.textContent = 'Wind Speed: ' + data.wind.speed + ' m/s';

    // Show the cloud image
    cloudImage.style.display = 'inline';
}



function displayForecast(data) {
    var forecastRow = document.querySelector('.forecast-row');
    forecastRow.innerHTML = ''; // Clear previous forecast data

    // Extract the forecast data for the next 5 days
    var next5DaysForecast = data.list.filter(forecast => {
        var forecastDate = new Date(forecast.dt_txt);
        var currentDate = new Date();
        return (forecastDate.getDate() - currentDate.getDate() > 0 && forecastDate.getDate() - currentDate.getDate() <= 3);
    });

    // Calculate and display the average temperature for each day
    for (let i = 0; i < next5DaysForecast.length; i += 8) { // Data is provided for every 3 hours, so we skip 8 items to get daily data
        var forecast = next5DaysForecast[i];
        var forecastDate = new Date(forecast.dt_txt);
        var dateString = forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        var temperature = Math.round(forecast.main.temp - 273.15); // Convert temperature to Celsius
        
        // Create HTML elements for each day's forecast
        var forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = 
            `<div class="date">${dateString}</div>
            <div class="mist img"><img src="mist.png" alt="Cloud Image"></div>
            <div class="temp">${temperature}°C</div>`;
        forecastRow.appendChild(forecastItem);
    }
}

