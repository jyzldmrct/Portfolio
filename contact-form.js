document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p id="modal-message"></p>
        </div>
    `;
    document.body.appendChild(modal);

    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    // Modal functions
    function openModal(message, isSuccess) {
        modalMessage.textContent = message;
        modal.classList.add('show');
        modalMessage.style.color = isSuccess ? 'green' : 'red';
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Send data to Google Apps Script web app
        fetch('https://script.google.com/macros/s/AKfycbxkprAyrmqIl551C9_f_4yW0vPNpC4w2AK94XAJ_nhKO_pdUmasKgF9hBTlH22rBry7/exec', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
        })
        .then(response => response.json())
        .then(data => {
            // Handle successful submission
            openModal('Message sent successfully!', true);
            form.reset();
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            openModal('Failed to send message. Please try again.', false);
        });
    });
});