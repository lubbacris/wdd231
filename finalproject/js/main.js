// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// Footer Last Modified Script
document.addEventListener("DOMContentLoaded", () => {
    const footerSpan = document.getElementById("lastModified");
    if (footerSpan) {
        const lastMod = new Date(document.lastModified);
        const options = { 
            weekday: 'short', year: 'numeric', month: 'short', 
            day: 'numeric', hour: '2-digit', minute: '2-digit' 
        };
        footerSpan.textContent = `Last Updated: ${lastMod.toLocaleDateString('en-ZA', options)}`;
    }
});