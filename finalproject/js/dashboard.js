import { formatCurrency } from './utils.js';

const listContainer = document.getElementById('transaction-list');
const searchInput = document.getElementById('searchTransactions');
let allTransactions = []; // Storing data in memory

// Fetching & Initializing
async function initDashboard() {
    try {
        const response = await fetch('data/transactions.json');
        if (!response.ok) throw new Error('Failed to load');
        allTransactions = await response.json();

        updateUI(); 

    } catch (error) {
        console.error(error);
        listContainer.innerHTML = '<p style="color:red; text-align:center;">Failed to load data. Ensure local server is running.</p>';
    }
}

// Central UI Updater
function updateUI() {
    // Filtering based on search
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    const filtered = allTransactions.filter(t => 
        t.description.toLowerCase().includes(term) || 
        t.category.toLowerCase().includes(term)
    );

    renderList(filtered);
    updateCards(filtered);
    renderChart(filtered);
}

// Rendering List
function renderList(data) {
    listContainer.innerHTML = '';
    
    // Sorting by Date
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedData.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted)">No transactions found.</p>';
        return;
    }

    sortedData.slice(0, 50).forEach(item => {
        const html = `
            <div class="transaction-item ${item.type}">
                <div class="t-details">
                    <h4>${item.description}</h4>
                    <small>${item.category} • ${item.date}</small>
                </div>
                <div class="t-amount" style="color: ${item.type === 'income' ? 'var(--success)' : 'var(--danger)'}">
                    ${item.type === 'income' ? '+' : '-'} ${formatCurrency(item.amount)}
                </div>
            </div>
        `;
        listContainer.insertAdjacentHTML('beforeend', html);
    });
}

// Search
if (searchInput) {
    searchInput.addEventListener('input', () => updateUI());
}

// Updating Totals
function updateCards(data) {
    const income = data.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = data.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('total-income').textContent = formatCurrency(income);
    document.getElementById('total-expenses').textContent = formatCurrency(expense);
    document.getElementById('total-balance').textContent = formatCurrency(income - expense);
}

// Chart Implementation
let myChart = null;

function renderChart(data) {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;

    if (myChart) myChart.destroy(); // Clear old chart

    // Aggregate expenses by category
    const categories = {};
    data.filter(t => t.type === 'expense').forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#b91c1c', '#ea580c', '#15803d', '#1d4ed8', '#7e22ce', '#be185d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { color: '#334155' } } }
        }
    });
}

// Modal Logic
const modal = document.getElementById('transactionModal');
const openBtn = document.getElementById('addTransactionBtn');
const closeBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('transactionForm');

// Opening
if (openBtn) {
    openBtn.addEventListener('click', () => {
        modal.showModal();
        document.getElementById('t-date').valueAsDate = new Date();
    });
}

// Closing Helpers
const closeModal = () => {
    modal.close();
    form.reset();
};
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

// Handling Submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Preventing reload

        // Gathering Data
        const formData = new FormData(form);
        const newTx = {
            id: Date.now(),
            description: formData.get('description'),
            amount: parseFloat(formData.get('amount')),
            date: formData.get('date'),
            category: formData.get('category'),
            type: formData.get('type')
        };

        // Adding to Array
        allTransactions.push(newTx);

        // Updating UI
        updateUI();

        // Closing & Notifying
        closeModal();
    });
}

initDashboard();