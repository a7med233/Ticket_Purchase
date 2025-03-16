// script.js
document.addEventListener("DOMContentLoaded", function () {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const cashMessage = document.getElementById('cashMessage');
    const revolutQR = document.getElementById('revolutQR');
    const qrCodeContainer = document.getElementById('qrCode');
    const form = document.getElementById('ticketForm');

    // Handle payment method selection
    paymentMethodSelect.addEventListener('change', function () {
        const paymentMethod = paymentMethodSelect.value;

        // Hide both options initially
        cashMessage.style.display = 'none';
        revolutQR.style.display = 'none';

        if (paymentMethod === 'cash') {
            // Display cash payment message
            cashMessage.style.display = 'block';
        } else if (paymentMethod === 'revolut') {
            // Display Revolut payment QR code
            revolutQR.style.display = 'block';

            // Generate the QR code for Revolut payment
            const revolutPaymentLink = "https://revolut.com/pay?account=your-revolut-account-id";  // Replace with your actual Revolut payment link
            generateQRCode(revolutPaymentLink);  // Generate QR code for Revolut
        }
    });

    // Function to generate QR code
    function generateQRCode(link) {
        new QRCode(qrCodeContainer, {
            text: link,  // URL or payment link
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.L
        });
    }

    // Optional: Handle form submission (if needed for backend)
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form from submitting in the traditional way

        const formData = {
            ticketType: document.getElementById('ticketType').value,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            paymentMethod: paymentMethodSelect.value
        };

        // For now, just logging form data (you can send it to a backend here)
        console.log(formData);

        // Optionally, show an alert or confirmation message after form submission
        alert("Form submitted successfully!");
    });
});
