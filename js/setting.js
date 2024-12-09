document.addEventListener('DOMContentLoaded', function() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImg = document.querySelector('.avatar-container img'); // Changed selector
    const removePhotoBtn = document.getElementById('remove-photo');
    const bioTextarea = document.getElementById('bio');
    const charCount = document.querySelector('.setting__characters-count');
    const form = document.querySelector('.setting__form');
    const defaultAvatarPath = './assets/images/profileImage/default-user.png';

    // Handle avatar upload and preview
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImg.src = event.target.result; // Changed from previewAvatar
                removePhotoBtn.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle remove photo
    removePhotoBtn.addEventListener('click', function() {
        avatarImg.src = defaultAvatarPath;
        avatarUpload.value = '';
        removePhotoBtn.style.display = 'none';
    });

    // Check if current avatar is default to show/hide remove button
    function checkAvatarStatus() {
        if (avatarImg.src.includes('default-user.png')) {
            removePhotoBtn.style.display = 'none';
        } else {
            removePhotoBtn.style.display = 'block';
        }
    }

    // Initial check for avatar status
    checkAvatarStatus();

    // Handle bio character count
    bioTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/150`;
        
        if (length > 150) {
            this.value = this.value.substring(0, 150);
            charCount.textContent = "150/150";
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            bio: document.getElementById('bio').value
        };

        // Here you would typically send the data to your server
        console.log('Form submitted:', formData);
        alert('Profile updated successfully!');
    });
});


//------------------- Gender Selection -------------------//

// In your form submission event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        bio: document.getElementById('bio').value,
        gender: document.getElementById('gender').value
    };

    // Here you would typically send the data to your server
    console.log('Form submitted:', formData);
    alert('Profile updated successfully!');
});

// If you want to pre-select a gender from the backend
document.addEventListener('DOMContentLoaded', function() {
    // Assuming you pass the current user's gender from PHP
    const currentGender = '<?php echo $user["gender"] ?? ""; ?>';
    if (currentGender) {
        document.getElementById('gender').value = currentGender;
    }
});