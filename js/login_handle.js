document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const showHidePassword = document.getElementById('show_hide_password');

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

    // Show/Hide Password functionality
    showHidePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showHidePassword.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            showHidePassword.textContent = 'Show';
        }
    });

    // Validation function
    function validateForm(e) {
        // Prevent default form submission
        e.preventDefault();

        // Clear any previous error messages
        [emailInput, passwordInput].forEach(clearError);

        let isValid = true;

        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email cannot be empty');
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

        // If all validations pass, log input values
        if (isValid) {
            // Log input values to console
            console.log('Email:', emailInput.value);
            console.log('Password:', passwordInput.value);

            // Call login function
            login();
        }
    }

    
    // Function to set cookie with expiration date
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Tính thời gian hết hạn theo số ngày
        const expires = "expires=" + date.toUTCString();  // Chuyển đổi ngày thành UTC string
        document.cookie = `${name}=${value}; ${expires}; path=/`;  // Lưu cookie với thời gian hết hạn
    }

    function login() {
        const loginData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        fetch('http://localhost:8080/social-network/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            console.log('API Response:', data);
            console.log('Token:', data.result.token);
            
            if (data.result.token) {
                const token = data.result.token;
                const expiresIn = 1; // Thời gian hết hạn của token (1 ngày, bạn có thể thay đổi nếu cần)
                setCookie('token', token, expiresIn);  // Lưu token vào cookie với thời gian hết hạn là 1 ngày

                fetch('http://localhost:8080/social-network/users/my-info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then (response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed');
                    }
                })
                .then (data => {
                    setCookie('userId', data.result.user_id, expiresIn);
                    setCookie('username', data.result.username, expiresIn);
                    setCookie('gender', data.result.gender, expiresIn);
                    setCookie('avatar', data.result.avatar, expiresIn);
                    setCookie('bio', data.result.bio, expiresIn);
                })

                // window.location.href = '/Social-Network-Project-Instagram/home';
            } else {
                alert('Token không có trong phản hồi API.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed');
        });
    }



    // Add form submit event listener
    form.addEventListener('submit', validateForm);
});
