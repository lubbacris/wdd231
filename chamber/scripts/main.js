// Common functions for all chamber pages

// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Set current year
function setCurrentYear() {
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Set last modified date
function setLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

// Mobile navigation toggle
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    if (!hamburger || !mainNav) return;
    
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        mainNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open menu');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open menu');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    setCurrentYear();
    setLastModified();
    initNavigation();
});