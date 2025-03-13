<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bus Provider Registration</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        .form-container {
            max-width: 700px;
            width: 95%;
            margin: 20px auto;
            padding: 25px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 25px;
            font-size: 24px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }

        .input-group {
            margin-bottom: 15px;
            position: relative;
        }

        .input-group label {
            display: block;
            margin-bottom: 6px;
            color: #34495e;
            font-weight: 500;
            font-size: 14px;
        }

        .input-group input {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background-color: white;
        }

        .input-group input:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
            outline: none;
        }

        .error {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 4px;
            display: none;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .bus-details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            border: 1px solid #e0e0e0;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .bus-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            color: #2c3e50;
            font-size: 18px;
        }

        .add-bus-btn {
            background-color: #27ae60;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 15px auto;
            transition: all 0.3s ease;
        }

        .add-bus-btn:hover {
            background-color: #219a52;
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .submit-btn {
            background-color: #3498db;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
            margin-top: 15px;
            transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .remove-bus-btn {
            background-color: #e74c3c;
            color: white;
            padding: 6px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }

        .remove-bus-btn:hover {
            background-color: #c0392b;
            transform: scale(1.05);
        }

        .loading {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .loading-spinner {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .form-container {
                width: 100%;
                margin: 10px;
                padding: 15px;
            }

            .bus-details {
                padding: 15px;
            }

            .input-group input {
                font-size: 16px;
            }
        }

        .input-group input.invalid {
            border-color: #e74c3c;
            background-color: #ffebee;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1);
        }

        .input-group input.valid {
            border-color: #2ecc71;
            background-color: #e8f5e9;
            box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.1);
        }

        .input-group input:hover {
            border-color: #bdc3c7;
        }

        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
        }

        .input-group input[type="file"].valid {
            border: 2px solid #2ecc71;
            padding: 8px;
            background-color: #e8f5e9;
        }

        .input-group input[type="file"].invalid {
            border: 2px solid #e74c3c;
            padding: 8px;
            background-color: #ffebee;
        }
        .error-message {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          text-align: center;
        }
    </style>
</head>
<body>
<div class="form-container">
    <h2>Bus Provider Registration</h2>

    <div th:if="${error}" class="error-message" th:text="${error}"></div>

    <form id="busProviderForm" onsubmit="return validateForm(event)">
        <div class="input-group">
            <label for="email"><i class="fas fa-envelope"></i> Email:</label>
            <input type="email" id="email" name="email" required>
            <span class="error" id="emailError">Please enter a valid email address</span>
        </div>

        <div class="input-group">
            <label for="password"><i class="fas fa-lock"></i> Password:</label>
            <input type="password" id="password" name="password" required>
            <span class="error" id="passwordError">Password is required</span>
        </div>

        <div class="input-group">
            <label for="phone"><i class="fas fa-phone"></i> Phone Number:</label>
            <input type="tel" id="phone" name="phone" required>
            <span class="error" id="phoneError">Please enter a valid 10-digit Indian phone number</span>
        </div>

        <div id="busContainer">
            <!-- Bus details will be added here -->
        </div>

        <button type="button" class="add-bus-btn" onclick="addNewBus()">
            <i class="fas fa-plus"></i> Add Another Bus
        </button>
        <button type="submit" class="submit-btn" disabled>
            <i class="fas fa-paper-plane"></i> Submit Registration
        </button>
    </form>
</div>

<div class="loading">
    <div class="loading-spinner"></div>
</div>
    <script>
        let busCount = 0;

// Add first bus when page loads
document.addEventListener('DOMContentLoaded', () => {
// Add first bus form
addFirstBus();

// Add validation listeners for email
const email = document.getElementById('email');
email.addEventListener('input', function() {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!this.value.trim()) {
this.classList.remove('valid', 'invalid');
hideError('emailError');
} else if (emailRegex.test(this.value)) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError('emailError');
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError('emailError', 'Please enter a valid email address');
}
updateSubmitButton();
});

// Add validation listeners for password
const password = document.getElementById('password');
password.addEventListener('input', function() {
if (!this.value.trim()) {
this.classList.remove('valid', 'invalid');
hideError('passwordError');
} else if (this.value.length >= 6) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError('passwordError');
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError('passwordError', 'Password must be at least 6 characters long');
}
updateSubmitButton();
});

// Add validation listeners for phone
const phone = document.getElementById('phone');
phone.addEventListener('input', function() {
const phoneRegex = /^[6-9]\d{9}$/;
if (!this.value.trim()) {
this.classList.remove('valid', 'invalid');
hideError('phoneError');
} else if (phoneRegex.test(this.value)) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError('phoneError');
} else {
this.classList.add('invalid');
this.classList.remove('valid');
let errorMessage = '';
if (this.value.length !== 10) {
errorMessage = 'Phone number must be exactly 10 digits';
} else if (!/^[6-9]/.test(this.value)) {
errorMessage = 'Indian phone numbers must start with 6, 7, 8, or 9';
} else {
errorMessage = 'Please enter a valid Indian phone number';
}
showError('phoneError', errorMessage);
}
updateSubmitButton();
});
});

// Add this function to validate bus numbers
function validateBusNumber(busNumber) {
// Regex patterns for AP and TS vehicle numbers
const apPattern = /^AP\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/i;  // AP 12 AB 1234
const tsPattern = /^TS\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/i;  // TS 12 AB 1234

// Remove spaces and convert to uppercase for consistent checking
const formattedNumber = busNumber.replace(/\s+/g, '').toUpperCase();

return apPattern.test(formattedNumber) || tsPattern.test(formattedNumber);
}

function validateForm(event) {
event.preventDefault();
let isValid = true;

// Email validation
const email = document.getElementById('email');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email.value)) {
showError('emailError', 'Please enter a valid email address');
email.classList.add('invalid');
email.classList.remove('valid');
isValid = false;
}

// Password validation
const password = document.getElementById('password');
if (password.value.length < 6) {
showError('passwordError', 'Password must be at least 6 characters long');
password.classList.add('invalid');
password.classList.remove('valid');
isValid = false;
}

// Phone validation
const phone = document.getElementById('phone');
const phoneRegex = /^[6-9]\d{9}$/;
if (!phoneRegex.test(phone.value)) {
let errorMessage = '';
if (phone.value.length !== 10) {
errorMessage = 'Phone number must be exactly 10 digits';
} else if (!/^[6-9]/.test(phone.value)) {
errorMessage = 'Indian phone numbers must start with 6, 7, 8, or 9';
} else {
errorMessage = 'Please enter a valid Indian phone number';
}
showError('phoneError', errorMessage);
phone.classList.add('invalid');
phone.classList.remove('valid');
isValid = false;
}

// Validate each bus's details
const busElements = document.querySelectorAll('.bus-details');
busElements.forEach((busElement) => {
const busId = busElement.id.replace('bus', '');

// Bus number validation
const busNumber = document.getElementById(`busNumber${busId}`);
if (!validateBusNumber(busNumber.value)) {
showError(`busNumberError${busId}`,
'Please enter a valid AP or TS vehicle number',
`busNumber${busId}`);
isValid = false;
} else {
hideError(`busNumberError${busId}`, `busNumber${busId}`);
}

// File validations
const busImage = document.getElementById(`busImage${busId}`);
const busRC = document.getElementById(`busRC${busId}`);
const busInsurance = document.getElementById(`busInsurance${busId}`);

// Bus Image validation (2MB)
if (!busImage.files[0]) {
showError(`imageError${busId}`, 'Please select a bus image', `busImage${busId}`);
isValid = false;
} else if (busImage.files[0].size > 2 * 1024 * 1024) {
showError(`imageError${busId}`, 'Image size should not exceed 2MB', `busImage${busId}`);
isValid = false;
} else {
hideError(`imageError${busId}`, `busImage${busId}`);
}

// RC PDF validation (5MB)
if (!busRC.files[0]) {
showError(`rcError${busId}`, 'Please select RC document', `busRC${busId}`);
isValid = false;
} else if (!busRC.files[0].type.includes('pdf')) {
showError(`rcError${busId}`, 'Please upload a PDF file for RC', `busRC${busId}`);
isValid = false;
} else if (busRC.files[0].size > 5 * 1024 * 1024) {
showError(`rcError${busId}`, 'RC PDF size should not exceed 5MB', `busRC${busId}`);
isValid = false;
} else {
hideError(`rcError${busId}`, `busRC${busId}`);
}

// Insurance PDF validation (5MB)
if (!busInsurance.files[0]) {
showError(`insuranceError${busId}`, 'Please select Insurance document', `busInsurance${busId}`);
isValid = false;
} else if (!busInsurance.files[0].type.includes('pdf')) {
showError(`insuranceError${busId}`, 'Please upload a PDF file for Insurance', `busInsurance${busId}`);
isValid = false;
} else if (busInsurance.files[0].size > 5 * 1024 * 1024) {
showError(`insuranceError${busId}`, 'Insurance PDF size should not exceed 5MB', `busInsurance${busId}`);
isValid = false;
} else {
hideError(`insuranceError${busId}`, `busInsurance${busId}`);
}
});

if (isValid) {
submitForm();
} else {
// Show an alert if form is invalid
alert('Please fill all fields correctly before submitting');
}

return false;
}

function showError(elementId, message, inputId = null) {
const errorElement = document.getElementById(elementId);
errorElement.textContent = message;
errorElement.style.display = 'block';

// Add invalid class to input if inputId is provided
if (inputId) {
const inputElement = document.getElementById(inputId);
inputElement.classList.add('invalid');
inputElement.classList.remove('valid');
}
}

function hideError(elementId, inputId = null) {
const errorElement = document.getElementById(elementId);
errorElement.style.display = 'none';

// Remove invalid class and add valid class if inputId is provided
if (inputId) {
const inputElement = document.getElementById(inputId);
inputElement.classList.remove('invalid');
inputElement.classList.add('valid');
}
}

// Function to add the first bus (cannot be removed)
function addFirstBus() {
busCount++;
const busContainer = document.getElementById('busContainer');

const newBusDiv = document.createElement('div');
newBusDiv.className = 'bus-details';
newBusDiv.id = `bus${busCount}`;
newBusDiv.innerHTML = `
<h3 class="bus-header">
<span>Bus ${busCount}</span>
</h3>
<div class="input-group">
<label for="busNumber${busCount}"><i class="fas fa-bus"></i> Bus Number:</label>
<input type="text"
id="busNumber${busCount}"
name="busNumber${busCount}"
placeholder="AP 12 AB 1234 or TS 12 AB 1234"
required>
<span class="error" id="busNumberError${busCount}"></span>
</div>

<div class="input-group">
<label for="busImage${busCount}"><i class="fas fa-image"></i> Bus Image (max 2MB):</label>
<input type="file" id="busImage${busCount}" name="busImage${busCount}" accept="image/*" required>
<span class="error" id="imageError${busCount}"></span>
</div>

<div class="input-group">
<label for="busRC${busCount}"><i class="fas fa-file-pdf"></i> Bus RC (PDF, max 5MB):</label>
<input type="file" id="busRC${busCount}" name="busRC${busCount}" accept=".pdf" required>
<span class="error" id="rcError${busCount}"></span>
</div>

<div class="input-group">
<label for="busInsurance${busCount}"><i class="fas fa-file-contract"></i> Bus Insurance (PDF, max 5MB):</label>
<input type="file" id="busInsurance${busCount}" name="busInsurance${busCount}" accept=".pdf" required>
<span class="error" id="insuranceError${busCount}"></span>
</div>
`;

busContainer.appendChild(newBusDiv);
newBusDiv.style.animation = 'fadeIn 0.5s ease-out';
addValidationListeners(busCount);
}

// Function to add additional buses (can be removed)
function addNewBus() {
busCount++;
const busContainer = document.getElementById('busContainer');

const newBusDiv = document.createElement('div');
newBusDiv.className = 'bus-details';
newBusDiv.id = `bus${busCount}`;
newBusDiv.innerHTML = `
<h3 class="bus-header">
<span>Bus ${busCount}</span>
<button type="button" class="remove-bus-btn" onclick="removeBus(${busCount})">
<i class="fas fa-trash"></i> Remove
</button>
</h3>
<div class="input-group">
<label for="busNumber${busCount}"><i class="fas fa-bus"></i> Bus Number:</label>
<input type="text"
id="busNumber${busCount}"
name="busNumber${busCount}"
placeholder="AP 12 AB 1234 or TS 12 AB 1234"
required>
<span class="error" id="busNumberError${busCount}"></span>
</div>

<div class="input-group">
<label for="busImage${busCount}"><i class="fas fa-image"></i> Bus Image (max 2MB):</label>
<input type="file" id="busImage${busCount}" name="busImage${busCount}" accept="image/*" required>
<span class="error" id="imageError${busCount}"></span>
</div>

<div class="input-group">
<label for="busRC${busCount}"><i class="fas fa-file-pdf"></i> Bus RC (PDF, max 5MB):</label>
<input type="file" id="busRC${busCount}" name="busRC${busCount}" accept=".pdf" required>
<span class="error" id="rcError${busCount}"></span>
</div>

<div class="input-group">
<label for="busInsurance${busCount}"><i class="fas fa-file-contract"></i> Bus Insurance (PDF, max 5MB):</label>
<input type="file" id="busInsurance${busCount}" name="busInsurance${busCount}" accept=".pdf" required>
<span class="error" id="insuranceError${busCount}"></span>
</div>
`;

busContainer.appendChild(newBusDiv);
newBusDiv.style.animation = 'fadeIn 0.5s ease-out';
addValidationListeners(busCount);
}

// Function to add validation listeners to bus inputs
function addValidationListeners(busId) {
// Bus number validation
const busNumberInput = document.getElementById(`busNumber${busId}`);
busNumberInput.addEventListener('input', function() {
if (!this.value.trim()) {
this.classList.remove('valid', 'invalid');
} else if (validateBusNumber(this.value)) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError(`busNumberError${busId}`);
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError(`busNumberError${busId}`,
'Please enter a valid AP or TS vehicle number (e.g., AP 12 AB 1234 or TS 12 AB 1234)');
}
updateSubmitButton();
});

// Bus image validation
const busImageInput = document.getElementById(`busImage${busId}`);
busImageInput.addEventListener('change', function() {
if (!this.files[0]) {
this.classList.remove('valid', 'invalid');
} else if (this.files[0].size <= 2 * 1024 * 1024) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError(`imageError${busId}`);
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError(`imageError${busId}`, 'File size should not exceed 2MB');
}
updateSubmitButton();
});

// RC PDF validation
const busRCInput = document.getElementById(`busRC${busId}`);
busRCInput.addEventListener('change', function() {
if (!this.files[0]) {
this.classList.remove('valid', 'invalid');
} else if (this.files[0].type.includes('pdf') && this.files[0].size <= 5 * 1024 * 1024) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError(`rcError${busId}`);
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError(`rcError${busId}`,
this.files[0].type.includes('pdf') ?
'RC PDF size should not exceed 5MB' :
'Please upload a PDF file for RC');
}
updateSubmitButton();
});

// Insurance PDF validation
const busInsuranceInput = document.getElementById(`busInsurance${busId}`);
busInsuranceInput.addEventListener('change', function() {
if (!this.files[0]) {
this.classList.remove('valid', 'invalid');
} else if (this.files[0].type.includes('pdf') && this.files[0].size <= 5 * 1024 * 1024) {
this.classList.add('valid');
this.classList.remove('invalid');
hideError(`insuranceError${busId}`);
} else {
this.classList.add('invalid');
this.classList.remove('valid');
showError(`insuranceError${busId}`,
this.files[0].type.includes('pdf') ?
'Insurance PDF size should not exceed 5MB' :
'Please upload a PDF file for Insurance');
}
updateSubmitButton();
});

// Add input event listeners to check required fields
const inputs = document.querySelectorAll(`#bus${busId} input[required]`);
inputs.forEach(input => {
input.addEventListener('input', updateSubmitButton);
input.addEventListener('change', updateSubmitButton);
});
}

function removeBus(busId) {
const busElement = document.getElementById(`bus${busId}`);
busElement.style.animation = 'fadeOut 0.3s ease-out';
setTimeout(() => {
busElement.remove();
// Reorder remaining buses
reorderBuses();
}, 300);
}

function reorderBuses() {
const busElements = document.querySelectorAll('.bus-details');
busElements.forEach((element, index) => {
const newIndex = index + 1;
element.id = `bus${newIndex}`;

// Update the heading
const heading = element.querySelector('h3');
heading.innerHTML = `
Bus #${newIndex}
${newIndex > 1 ? `<button type="button" class="remove-bus-btn" onclick="removeBus(${newIndex})">
<i class="fas fa-trash"></i> Remove
</button>` : ''}
`;

// Update all input IDs and names
const inputs = element.querySelectorAll('input');
inputs.forEach(input => {
const baseName = input.id.replace(/\d+$/, '');
input.id = `${baseName}${newIndex}`;
input.name = `${baseName}${newIndex}`;
});

// Update error spans
const errorSpans = element.querySelectorAll('.error');
errorSpans.forEach(span => {
const baseName = span.id.replace(/\d+$/, '');
span.id = `${baseName}${newIndex}`;
});
});

// Update busCount to reflect actual number of buses
busCount = busElements.length;
}

async function submitForm() {
const loadingScreen = document.querySelector('.loading');
loadingScreen.style.display = 'flex';

try {

// Add basic info
const basicInfo = {
email: document.getElementById('email').value,
password: document.getElementById('password').value,
phone: document.getElementById('phone').value
};

// Create FormData object
let formData = new FormData();
formData.append("email", basicInfo.email);
formData.append("password", basicInfo.password);
formData.append("phone", basicInfo.phone);

// Create buses array
const busElements = document.querySelectorAll('.bus-details');

// Iterate through actual bus elements on the page
busElements.forEach((busElement, index) => {
const busId = busElement.id.replace('bus', '');
formData.append(`busNumber`, document.getElementById(`busNumber${busId}`).value);
formData.append(`busImage`, document.getElementById(`busImage${busId}`).files[0]);
formData.append(`busRC`, document.getElementById(`busRC${busId}`).files[0]);
formData.append(`busInsurance`, document.getElementById(`busInsurance${busId}`).files[0]);
});

console.log([...formData]); // For debugging: check the content of formData

// Send to backend
const response = await fetch('/signup', {
method: 'POST',
body: formData // No need to set Content-Type header; it's automatically set to multipart/form-data
});



// if (!response.ok) {
//     throw new Error('Registration failed');
// }

// const result = await response.json();

// if (result.success) {
//     console.log('Submitted data:', {
//         basicInfo,
//         buses,
//         totalBuses: buses.length,formData
//     });
//     alert('Registration successful!');
//     window.location.href = '/success-page';
// } else {
//     alert(result.message || 'Registration failed. Please try again.');
//     window.location.href = 'busProviderRegistration.html';
// }
} catch (error) {
console.error('Error:', error);
// alert('An error occurred during registration. Please try again.');
// window.location.href = 'busProviderRegistration.html';
} finally {
loadingScreen.style.display = 'none';
}
}


// Update the submit button to be disabled when form is invalid
function updateSubmitButton() {
const submitBtn = document.querySelector('.submit-btn');
const invalidInputs = document.querySelectorAll('.invalid');
const allInputs = document.querySelectorAll('input[required]');
let hasEmptyFields = false;

// Check if any required field is empty
allInputs.forEach(input => {
if (input.type === 'file') {
if (!input.files || !input.files[0]) {
hasEmptyFields = true;
}
} else {
if (!input.value.trim()) {
hasEmptyFields = true;
}
}
});

if (invalidInputs.length > 0 || hasEmptyFields) {
submitBtn.disabled = true;
submitBtn.style.opacity = '0.5';
submitBtn.style.cursor = 'not-allowed';
} else {
submitBtn.disabled = false;
submitBtn.style.opacity = '1';
submitBtn.style.cursor = 'pointer';
}
}
    </script>
</body>
</html>