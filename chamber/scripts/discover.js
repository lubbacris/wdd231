import { places } from '../data/places.mjs';

// 1. Handle Visitor Message (localStorage)
const messageElement = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    // First visit
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    // Calculating time difference
    const diffTime = now - parseInt(lastVisit);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        const dayString = diffDays === 1 ? "day" : "days";
        messageElement.textContent = `You last visited ${diffDays} ${dayString} ago.`;
    }
}

// Storing current visit date
localStorage.setItem('lastVisit', now);


// 2. Generating Places Cards
const gridContainer = document.getElementById('places-grid');

function displayPlaces(places) {
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'place-card';
        
        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" alt="${place.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button onclick="window.open('${place.learnMoreLink}', '_blank')">Learn More</button>
        `;
        
        gridContainer.appendChild(card);
    });
}

// Initializing the display of places
displayPlaces(places);