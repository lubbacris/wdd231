document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Timestamp
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }

    // 2. Modal Functionality
    const modalButtons = document.querySelectorAll('.modal-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open Modals
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            modal.close();
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    });
});