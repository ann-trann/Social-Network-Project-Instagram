document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); // Changed from submitButton
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const fullNameInput = document.querySelector('input[name="full_name"]');
    const usernameInput = document.querySelector('input[name="username"]');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to show error message
    function showError(input, message) {
        // Remove any existing error messages
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }

        // Create and insert error message
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8em';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        input.insertAdjacentElement('afterend', errorElement);
        input.style.borderColor = 'red';
    }

    // Function to remove error message
    function clearError(input) {
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    // Validation function
    function validateForm(e) {
        // Prevent default form submission
        e.preventDefault();

        // Clear any previous error messages
        [emailInput, passwordInput, fullNameInput, usernameInput].forEach(clearError);

        let isValid = true;

        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email cannot be empty');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password cannot be empty');
            isValid = false;
        } else if (passwordInput.value.trim().length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        }

        // Full Name validation
        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, 'Full Name cannot be empty');
            isValid = false;
        }

        // Username validation
        if (!usernameInput.value.trim()) {
            showError(usernameInput, 'Username cannot be empty');
            isValid = false;
        }

        // If all validations pass, log input values and create display
        if (isValid) {
            // Log input values to console
            console.log('Email:', emailInput.value);
            console.log('Password:', passwordInput.value);
            console.log('Full Name:', fullNameInput.value);
            console.log('Username:', usernameInput.value);

            // Call register function
            register();

        }
    }

    // Add form submit event listener
    form.addEventListener('submit', validateForm);

    function register() {
        const loginData = {
            email: emailInput.value,
            fullname: fullNameInput.value,
            username: usernameInput.value,
            password: passwordInput.value            
          };
          
        fetch('http://localhost:81/social-network/auth/register', {
        method: 'POST',  // Phương thức HTTP
        headers: {
            'Content-Type': 'application/json'  // Định dạng dữ liệu gửi đi là JSON
        },
        body: JSON.stringify(loginData)  // Chuyển đổi dữ liệu thành chuỗi JSON
        })
        .then(response => {
            if (response.ok) {
            return response.json();  // Phản hồi trả về dưới dạng JSON
            } else {
            throw new Error('Login failed');  // Nếu lỗi, ném lỗi
            }
        })
            .then(data => {
                console.log('Login successful:', data);
                // Xử lý dữ liệu trả về (ví dụ: lưu token vào cookies)
                document.cookie = `token=${data.token}; path=/`;
                // Điều hướng đến trang chính hoặc trang khác
                window.location.href = '/Social-Network-Project-Instagram/home';
            })
            .catch(error => {
            console.error('Error:', error);
            alert('Login failed');
        });
    }
});