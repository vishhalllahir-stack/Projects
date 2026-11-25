// Mock weather data for demonstration - Indian Cities Only
const mockWeatherData = {
    'Mumbai': {
        city: 'Mumbai',
        temperature: 32,
        description: 'Partly Cloudy',
        uvIndex: 8,
        humidity: 75,
        wind: 15,
        dewPoint: 25,
        pressure: 1010,
        visibility: 9
    },
    'Delhi': {
        city: 'Delhi',
        temperature: 38,
        description: 'Sunny',
        uvIndex: 9,
        humidity: 45,
        wind: 12,
        dewPoint: 20,
        pressure: 1005,
        visibility: 8
    },
    'Bangalore': {
        city: 'Bangalore',
        temperature: 28,
        description: 'Rainy',
        uvIndex: 6,
        humidity: 80,
        wind: 10,
        dewPoint: 22,
        pressure: 1012,
        visibility: 7
    },
    'Chennai': {
        city: 'Chennai',
        temperature: 35,
        description: 'Sunny',
        uvIndex: 9,
        humidity: 70,
        wind: 18,
        dewPoint: 27,
        pressure: 1008,
        visibility: 10
    },
    'Kolkata': {
        city: 'Kolkata',
        temperature: 34,
        description: 'Humid',
        uvIndex: 7,
        humidity: 85,
        wind: 8,
        dewPoint: 28,
        pressure: 1009,
        visibility: 8
    },
    'Pune': {
        city: 'Pune',
        temperature: 30,
        description: 'Partly Cloudy',
        uvIndex: 7,
        humidity: 60,
        wind: 12,
        dewPoint: 22,
        pressure: 1013,
        visibility: 11
    },
    'Hyderabad': {
        city: 'Hyderabad',
        temperature: 36,
        description: 'Sunny',
        uvIndex: 9,
        humidity: 50,
        wind: 14,
        dewPoint: 24,
        pressure: 1007,
        visibility: 12
    },
    'Jaipur': {
        city: 'Jaipur',
        temperature: 39,
        description: 'Extreme Heat',
        uvIndex: 10,
        humidity: 35,
        wind: 20,
        dewPoint: 18,
        pressure: 1003,
        visibility: 6
    },
       'Kachchh': {
        city: 'Kachchh',
        temperature: 39,
        description: 'Extreme Heat',
        uvIndex: 10,
        humidity: 35,
        wind: 20,
        dewPoint: 18,
        pressure: 1003,
        visibility: 6
    },
       'Gujarat': {
        city: 'Gujarat',
        temperature: 39,
        description: 'Extreme Heat',
        uvIndex: 10,
        humidity: 35,
        wind: 20,
        dewPoint: 18,
        pressure: 1003,
        visibility: 6
    },
        'Bhuj': {
        city: 'Bhuj',
        temperature: 39,
        description: 'Extreme Heat',
        uvIndex: 10,
        humidity: 35,
        wind: 20,
        dewPoint: 18,
        pressure: 1003,
        visibility: 6
    }
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const dateTime = document.getElementById('dateTime');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const uvIndex = document.getElementById('uvIndex');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const dewPoint = document.getElementById('dewPoint');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const forecastContainer = document.getElementById('forecastContainer');
const hourlyContainer = document.getElementById('hourlyContainer');

// Event listeners
searchBtn.addEventListener('click', searchWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Initialize with default city
window.addEventListener('load', () => {
    displayWeather('Mumbai');
    updateDateTime();
    generateHourlyForecast();
    generateForecast();
    setInterval(updateDateTime, 1000);
});

// Search weather function
function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const foundCity = findCity(city);
    if (foundCity) {
        displayWeather(foundCity);
        searchInput.value = '';
    } else {
        alert(`City "${city}" not found. Try: Mumbai, Delhi, Bangalore, Chennai, Kolkata, Pune, Hyderabad, or Jaipur`);
        searchInput.focus();
    }
}

// Find city with case-insensitive search
function findCity(searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    return Object.keys(mockWeatherData).find(city => 
        city.toLowerCase() === lowerSearch || 
        city.toLowerCase().includes(lowerSearch)
    ) || null;
}

// Display weather function
function displayWeather(city) {
    const data = mockWeatherData[city] || mockWeatherData['New York'];
    
    cityName.textContent = data.city;
    temperature.textContent = data.temperature;
    weatherDescription.textContent = data.description;
    
    // Update UV Index with intensity level
    const uvLevel = data.uvIndex > 8 ? 'Extreme' : data.uvIndex > 6 ? 'Very High' : data.uvIndex > 3 ? 'High' : 'Moderate';
    uvIndex.textContent = `${data.uvIndex} (${uvLevel})`;
    
    humidity.textContent = `${data.humidity}%`;
    wind.textContent = `${data.wind} km/h`;
    dewPoint.textContent = `${data.dewPoint}°F`;
    pressure.textContent = `${data.pressure} mb`;
    visibility.textContent = `${data.visibility} km`;
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    dateTime.textContent = now.toLocaleDateString('en-US', options);
}

// Generate hourly forecast
function generateHourlyForecast() {
    hourlyContainer.innerHTML = '';
    const weatherEmojis = ['☀️', '⛅', '🌤️', '🌥️', '☁️', '🌦️', '⛈️'];
    const descriptions = ['Sunny', 'Partly Cloudy', 'Mostly Sunny', 'Cloudy', 'Overcast', 'Rainy', 'Stormy'];
    
    const now = new Date();
    
    // Generate 24 hourly forecasts
    for (let i = 0; i < 24; i++) {
        const forecastTime = new Date(now);
        forecastTime.setHours(forecastTime.getHours() + i);
        
        const hour = forecastTime.toLocaleString('en-US', { hour: '2-digit', hour12: true });
        const temp = Math.floor(Math.random() * 15) + 65; // Random temp between 65-80
        const emoji = weatherEmojis[Math.floor(Math.random() * weatherEmojis.length)];
        const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
        const wind = Math.floor(Math.random() * 20) + 5; // Random wind 5-25 km/h
        
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        hourlyItem.innerHTML = `
            <div class="hourly-time">${hour}</div>
            <div class="hourly-icon">${emoji}</div>
            <div class="hourly-temp">${temp}°F</div>
            <div class="hourly-desc">${desc}</div>
            <div class="hourly-wind">💨 ${wind}km/h</div>
        `;
        hourlyContainer.appendChild(hourlyItem);
    }
}

// Generate 5-day forecast
function generateForecast() {
    forecastContainer.innerHTML = '';
    const weatherEmojis = ['☀️', '⛅', '🌤️', '🌥️', '☁️'];
    const descriptions = ['Sunny', 'Partly Cloudy', 'Mostly Sunny', 'Cloudy', 'Overcast'];
    
    for (let i = 1; i <= 5; i++) {
        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + i);
        
        const dayName = forecastDate.toLocaleDateString('en-IN', { weekday: 'short' });
        const temp = Math.floor(Math.random() * 15) + 65; // Random temp between 65-80
        const emoji = weatherEmojis[Math.floor(Math.random() * weatherEmojis.length)];
        const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">${emoji}</div>
            <div class="forecast-temp">${temp}°F</div>
            <div class="forecast-desc">${desc}</div>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Autocomplete suggestions (optional feature)
function getSuggestions(input) {
    return Object.keys(mockWeatherData).filter(city =>
        city.toLowerCase().includes(input.toLowerCase())
    );
}

// Add autocomplete functionality
searchInput.addEventListener('input', function() {
    const input = this.value.trim();
    if (input.length > 0) {
        const suggestions = getSuggestions(input);
        console.log('Suggestions:', suggestions);
        // You can expand this to show dropdown suggestions
    }
});
