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

    // Validate duplicate bus numbers
    const busNumbers = [];
    const busElements = document.querySelectorAll('.bus-details');
    busElements.forEach((busElement) => {
        const busId = busElement.id.replace('bus', '');
        const busNumber = document.getElementById(`busNumber${busId}`).value.trim();

        if (!validateBusNumber(busNumber)) {
            showError(`busNumberError${busId}`, 'Please enter a valid AP or TS vehicle number');
            isValid = false;
        } else if (busNumbers.includes(busNumber)) {
            // Add error for duplicate bus numbers
            showError(`busNumberError${busId}`, 'Duplicate bus numbers are not allowed');
            isValid = false;
        } else {
            busNumbers.push(busNumber);
            hideError(`busNumberError${busId}`);
        }
    });

    // Validate each bus's files
    busElements.forEach((busElement) => {
        const busId = busElement.id.replace('bus', '');

        // Bus Image validation (2MB)
        const busImage = document.getElementById(`busImage${busId}`);
        if (!busImage.files[0]) {
            showError(`imageError${busId}`, 'Please select a bus image');
            isValid = false;
        } else if (busImage.files[0].size > 2 * 1024 * 1024) {
            showError(`imageError${busId}`, 'Image size should not exceed 2MB');
            isValid = false;
        } else {
            hideError(`imageError${busId}`);
        }

        // RC PDF validation (5MB)
        const busRC = document.getElementById(`busRC${busId}`);
        if (!busRC.files[0]) {
            showError(`rcError${busId}`, 'Please select RC document');
            isValid = false;
        } else if (!busRC.files[0].type.includes('pdf')) {
            showError(`rcError${busId}`, 'Please upload a PDF file for RC');
            isValid = false;
        } else if (busRC.files[0].size > 5 * 1024 * 1024) {
            showError(`rcError${busId}`, 'RC PDF size should not exceed 5MB');
            isValid = false;
        } else {
            hideError(`rcError${busId}`);
        }

        // Insurance PDF validation (5MB)
        const busInsurance = document.getElementById(`busInsurance${busId}`);
        if (!busInsurance.files[0]) {
            showError(`insuranceError${busId}`, 'Please select Insurance document');
            isValid = false;
        } else if (!busInsurance.files[0].type.includes('pdf')) {
            showError(`insuranceError${busId}`, 'Please upload a PDF file for Insurance');
            isValid = false;
        } else if (busInsurance.files[0].size > 5 * 1024 * 1024) {
            showError(`insuranceError${busId}`, 'Insurance PDF size should not exceed 5MB');
            isValid = false;
        } else {
            hideError(`insuranceError${busId}`);
        }
    });

    // Submit form if valid
    if (isValid) {
        submitForm();
    }

    return false;
}
