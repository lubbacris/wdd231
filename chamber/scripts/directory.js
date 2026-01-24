// Directory page specific functionality

// Sample member data (replace with your actual JSON file)
const members = [
    {
        name: "Tech Solutions Inc.",
        address: "123 Tech Street, Sandton, South Africa",
        phone: "+27 12 345 6789",
        website: "https://techsolutions.co.za",
        image: "tech-solutions.jpg",
        membership: "gold",
        description: "Leading IT services provider specializing in cloud solutions and cybersecurity."
    },
    {
        name: "Green Valley Restaurant",
        address: "456 Food Ave, Stellenbosch, South Africa",
        phone: "+27 12 345 6789",
        website: "https://greenvalley.co.za",
        image: "green-valley.jpg",
        membership: "silver",
        description: "Farm-to-table restaurant offering organic and locally sourced cuisine."
    },
    {
        name: "Summit Construction",
        address: "789 Builders Lane, Cape Town, South Africa",
        phone: "+27 12 345 6789",
        website: "https://summitconstruction.co.za",
        image: "summit-construction.jpg",
        membership: "gold",
        description: "Full-service construction company with 25 years of experience."
    },
    {
        name: "Bloom Florist",
        address: "321 Flower Road, Pretoria, South Africa",
        phone: "+27 12 345 6789",
        website: "https://bloomflorist.co.za",
        image: "bloom-florist.jpg",
        membership: "bronze",
        description: "Family-owned florist shop providing beautiful arrangements for all occasions."
    },
    {
        name: "Pinnacle Law Firm",
        address: "654 Justice Blvd, Johannesburg, South Africa",
        phone: "+27 12 345 6789",
        website: "https://pinnaclelaw.co.za",
        image: "pinnacle-law.jpg",
        membership: "gold",
        description: "Experienced legal team specializing in business and corporate law."
    },
    {
        name: "Wellness Medical Center",
        address: "987 Health Way, Pretoria, South Africa",
        phone: "+27 12 345 6789",
        website: "https://wellnessmedical.co.za",
        image: "wellness-medical.jpg",
        membership: "silver",
        description: "Comprehensive healthcare services for the entire family."
    },
    {
        name: "Creative Marketing Agency",
        address: "159 Marketing Drive, Stellenbosch, South Africa",
        phone: "+27 12 345 6789",
        website: "https://creativemarketing.co.za",
        image: "creative-marketing.jpg",
        membership: "bronze",
        description: "Digital marketing experts helping businesses grow their online presence."
    }
];

async function loadMembers() {
    try {
        // If you have a JSON file, use this:
        // const response = await fetch('data/members.json');
        // const members = await response.json();
        
        displayMembers(members);
        updateStats(members);
    } catch (error) {
        console.error('Error loading members:', error);
        displayMembers(members); // Fallback to sample data
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
            <img src="images/${member.image}" alt="${member.name}" class="member-logo">
            <h3 class="member-name">${member.name}</h3>
            <span class="membership-badge ${badgeClass}">${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)} Member</span>
        </div>
        <div class="member-details">
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <p><i class="fas fa-globe"></i> ${member.website}</p>
            <p><i class="fas fa-info-circle"></i> ${member.description}</p>
        </div>
        <div class="member-actions">
            <a href="${member.website}" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Visit Website
            </a>
            <a href="tel:${member.phone}" class="btn btn-outline">
                <i class="fas fa-phone"></i> Call Now
            </a>
        </div>
    `;
    
    return card;
}

function createListItem(member) {
    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    
    // Determine badge class
    let badgeClass = 'badge-bronze';
    if (member.membership === 'silver') badgeClass = 'badge-silver';
    if (member.membership === 'gold') badgeClass = 'badge-gold';
    
    listItem.innerHTML = `
        <div class="list-logo">
            <img src="images/${member.image}" alt="${member.name}" width="60" height="60">
        </div>
        <div class="list-info">
            <h3>${member.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
            <p><i class="fas fa-phone"></i> ${member.phone}</p>
            <span class="membership-badge ${badgeClass}">${member.membership.toUpperCase()}</span>
        </div>
        <div class="list-actions">
            <a href="${member.website}" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Website
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
        memberGrid.style.display = 'grid';
        memberList.style.display = 'none';
    });
    
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        memberGrid.style.display = 'none';
        memberList.style.display = 'block';
    });
}

// Initialize directory page
document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    initViewToggle();
});