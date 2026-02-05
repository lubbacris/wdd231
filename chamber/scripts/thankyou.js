document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('results');

    // Fields to display
    const showInfo = [
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Organization', key: 'organization' },
        { label: 'Timestamp', key: 'timestamp' }
    ];

    if (container) {
        showInfo.forEach(item => {
            const value = urlParams.get(item.key);
            if (value) {
                const p = document.createElement('p');
                // Decode URI components to handle special characters (like spaces/@)
                p.innerHTML = `<strong>${item.label}:</strong> ${decodeURIComponent(value)}`;
                container.appendChild(p);
            }
        });
    }
});