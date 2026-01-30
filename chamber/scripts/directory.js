// Directory page functionality

async function loadMembers() {
    try {
        // Fetching from JSON file
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const members = await response.json();
        
        displayMembers(members);
        updateStats(members);
    } catch (error) {
        console.error('Error loading members:', error);
        // Displaying user-friendly error message in the grid
        document.getElementById('member-grid').innerHTML = 
            '<p class="error-message">Unable to load directory data. Please try again later.</p>';
    }
}

function displayMembers(members) {
    const gridContainer = document.getElementById('member-grid');
    const listContainer = document.getElementById('member-list');
    
    // Clear containers
    gridContainer.innerHTML = '';
    listContainer.innerHTML = '';
    
    members.forEach(member => {
        // Create grid card
        const gridCard = createMemberCard(member);
        gridContainer.appendChild(gridCard);
        
        // Create list item
        const listItem = createListItem(member);
        listContainer.appendChild(listItem);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    // Determine badge class
    let badgeClass = 'badge-bronze';
    if (member.membership === 'silver') badgeClass = 'badge-silver';
    if (member.membership === 'gold') badgeClass = 'badge-gold';
    
    card.innerHTML = `
        <div class="member-header">
            <img src="images/${member.image}" alt="${member.name} Logo" class="member-logo" loading="lazy">
            <h3 class="member-name">${member.name}</h3>
            <span class="membership-badge ${badgeClass}">${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)} Member</span>
        </div>
        <div class="member-details">
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><i class="fas fa-globe"></i> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><i class="fas fa-info-circle"></i> ${member.description}</p>
        </div>
        <div class="member-actions">
            <a href="${member.website}" target="_blank" class="btn btn-primary" aria-label="Visit ${member.name} website">
                <i class="fas fa-external-link-alt"></i> Visit Website
            </a>
            <a href="tel:${member.phone.replace(/\s+/g, '')}" class="btn btn-outline" aria-label="Call ${member.name}">
                <i class="fas fa-phone"></i> Call Now
            </a>
        </div>
    `;
    
    return card;
}

function createListItem(member) {
    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    
    // Determining badge class
    let badgeClass = 'badge-bronze';
    if (member.membership === 'silver') badgeClass = 'badge-silver';
    if (member.membership === 'gold') badgeClass = 'badge-gold';
    
    listItem.innerHTML = `
        <div class="list-info">
            <h3>${member.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <span class="membership-badge ${badgeClass}">${member.membership.toUpperCase()}</span>
            <a href="${member.website}" target="_blank" class="list-website-link">
                ${member.website}
            </a>
        </div>
    `;
    
    return listItem;
}

function updateStats(members) {
    const total = members.length;
    const gold = members.filter(m => m.membership === 'gold').length;
    const silver = members.filter(m => m.membership === 'silver').length;
    const bronze = members.filter(m => m.membership === 'bronze').length;
    
    document.getElementById('total-members').textContent = total;
    document.getElementById('gold-members').textContent = gold;
    document.getElementById('silver-members').textContent = silver;
    document.getElementById('bronze-members').textContent = bronze;
}

function initViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const memberGrid = document.getElementById('member-grid');
    const memberList = document.getElementById('member-list');
    
    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        
        memberGrid.classList.remove('hidden');
        memberList.classList.add('hidden');
    });
    
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        
        memberGrid.classList.add('hidden');
        memberList.classList.remove('hidden');
    });
}

// Initializing directory page
document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    initViewToggle();
});