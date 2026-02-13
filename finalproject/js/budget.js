const budgetInput = document.getElementById('monthlyLimit');
const saveBtn = document.getElementById('saveBudgetBtn');
const msg = document.getElementById('saveMessage');

// Loading
const savedBudget = localStorage.getItem('financeBudget');
if (savedBudget) {
    budgetInput.value = savedBudget;
}

// Saving
saveBtn.addEventListener('click', () => {
    const value = budgetInput.value;
    if (value) {
        localStorage.setItem('financeBudget', value);
        msg.textContent = "Budget saved successfully!";
        msg.style.color = "var(--success)";
    } else {
        msg.textContent = "Please enter a value.";
        msg.style.color = "var(--danger)";
    }
});