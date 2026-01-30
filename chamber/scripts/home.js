// API Configuration
const apiKey = 'af1b9c3a1babe077fc1142cc51e60d69';

// Default Johannesburg location fallback
const defaultLat = '-26.2041';
const defaultLon = '28.0473';

// Initializing Weather based on Location
function initWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                apiFetch(lat, lon);
            },
            (error) => {
                console.log("Location access denied or error. Using default.");
                apiFetch(defaultLat, defaultLon);
            }
        );
    } else {
        apiFetch(defaultLat, defaultLon);
    }
}

// Fetching Data
async function apiFetch(lat, lon) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        // Current Weather
        const response = await fetch(urlWeather);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
        
        // Forecast
        const forecastResponse = await fetch(urlForecast);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.getElementById('current-temp');
    const weatherIcon = document.getElementById('weather-icon');
    const captionDesc = document.getElementById('weather-desc');

    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous

    // Filter for a specific time  to get one reading per day
    const filterForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    // Next 3 days Forecast
    const threeDay = filterForecast.slice(0, 3);

    threeDay.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconSrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';
        dayDiv.innerHTML = `
            <p class="forecast-date">${dayName}</p>
            <img src="${iconSrc}" alt="${day.weather[0].description}" width="50">
            <p class="forecast-temp">${Math.round(day.main.temp)}&deg;C</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

// --- Member Spotlights ---
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter for Gold or Silver members
        const qualifiedMembers = members.filter(member => 
            member.membership === 'gold' || member.membership === 'silver'
        );

        // Shuffle to randomize
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        // Display 3 members
        const selectedMembers = shuffled.slice(0, 3);

        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = `spotlight-card ${member.membership}-border`;
        
        card.innerHTML = `
            <div class="spotlight-header">
                <h3>${member.name}</h3>
                <span class="spotlight-badge">${member.membership.toUpperCase()}</span>
            </div>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p class="italic">"${member.description}"</p>
            <hr>
            <div class="spotlight-info">
                <p><i class="fas fa-envelope"></i> ${member.email || 'contact@email.com'}</p>
                <p><i class="fas fa-phone"></i> ${member.phone}</p>
                <a href="${member.website}" target="_blank">Website</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initWeather();
    loadSpotlights();
});