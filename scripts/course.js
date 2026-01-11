// Course data array for Software Development degree
const courses = [
    { subject: 'WDD', number: '130', title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: '131', title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: '231', title: 'Web Frontend Development I', credits: 2, completed: false },
    { subject: 'CSE', number: '110', title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'CSE', number: '210', title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'CSE', number: '111', title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: '330', title: 'Web Frontend Development II', credits: 3, completed: false },
    { subject: 'CSE', number: '340', title: 'Web Backend Development', credits: 3, completed: true },
    { subject: 'CSE', number: '341', title: 'Web Services', credits: 3, completed: false },
    { subject: 'WDD', number: '430', title: 'Web Full-Stack Development', credits: 3, completed: false },
    { subject: 'ITM', number: '111', title: 'Database Systems', credits: 3, completed: true },
    { subject: 'CSE', number: '212', title: 'Programming with Data Structures', credits: 2, completed: false },
    { subject: 'CSE', number: '270', title: 'Software Testing', credits: 3, completed: false },
    { subject: 'CSE', number: '300', title: 'Professional Readiness', credits: 1, completed: true },
    { subject: 'CSE', number: '310', title: 'Applied Programming', credits: 3, completed: false },
    { subject: 'CSE', number: '325', title: '.NET Software Development', credits: 3, completed: false },
    { subject: 'CSE', number: '370', title: 'Software Eng. Principles', credits: 2, completed: false },
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('course-cards');
    const totalCreditsSpan = document.getElementById('total-credits');
    const coursesCountSpan = document.getElementById('courses-count');
    
    // Filtering courses based on selection
    let filteredCourses = courses;
    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.subject === filter);
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Calculating total credits and courses
    let totalCredits = 0;
    
    // Creating course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="course-code">${course.subject} ${course.number}</div>
            <div class="course-title">${course.title}</div>
            <div class="course-details">
                <div class="course-credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</div>
                <div class="course-status ${course.completed ? 'completed' : 'pending'}">
                    ${course.completed ? '✓ Completed' : 'In Progress'}
                </div>
            </div>
        `;
        
        container.appendChild(card);
        totalCredits += course.credits;
    });
    
    // Updating total credits and courses count
    totalCreditsSpan.textContent = totalCredits;
    coursesCountSpan.textContent = filteredCourses.length;
    
    // Updating page title for filtered view
    updatePageTitle(filter, filteredCourses.length);
}

function updatePageTitle(filter, count) {
    const sectionHeader = document.querySelector('.courses-section .section-header h2');
    let title = 'Bachelor of Applied Science, Software Development Courses';
    
    if (filter === 'WDD') {
        title = `Web Development Courses (${count} courses)`;
    } else if (filter === 'CSE') {
        title = `Computer Science & Engineering Courses (${count} courses)`;
    } else if (filter === 'ITM') {
        title = `Information Technology Management Courses (${count} courses)`;
    } else if (filter === 'all') {
        title = `All Courses (${count} courses)`;
    }
    
    sectionHeader.textContent = title;
}

// Filter button functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            
            // Updating active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Displaying filtered courses
            displayCourses(filter);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCourses('all');
    setupFilterButtons();
    
    // Set initial active button
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courses, displayCourses };
}