document.addEventListener('DOMContentLoaded', function() {
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarImg = document.querySelector('.avatar-container img');
    const removePhotoBtn = document.getElementById('remove-photo');
    const bioTextarea = document.getElementById('bio');
    const charCount = document.querySelector('.setting__characters-count');
    const form = document.querySelector('.setting__form');
    const genderSelect = document.getElementById('gender');


    // Default profile data structure
    let originalProfileData = {
        fullname: '',
        username: '',
        bio: '',
        gender: '',
        avt: null
    };

    // Function to get token from cookie (reusing the function from profile.js)
    function getTokenFromCookie() {
        const name = 'token=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Function to decode JWT token (reusing the function from profile.js)
    function decodeJWTToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    

    // Fetch and populate user profile data
    function populateProfileSettings() {
        const token = getTokenFromCookie();
    
        if (token) {
            const decodedToken = decodeJWTToken(token);
            
            if (decodedToken && decodedToken.sub) {
                const userId = decodedToken.sub;
    
                // Fetch user profile data
                fetch(`http://localhost:81/social-network/users/my-info`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user profile.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.result) {
                        const profile = data.result;
                        
                        // Update avatar specifically using the avatar URL from profile
                        const avatarImg = document.querySelector('.avatar-container img');
                        if (profile.avatar) {
                            avatarImg.src = profile.avatar;
                            removePhotoBtn.style.display = 'block';
                        } else {
                            avatarImg.src = defaultAvatarPath;
                            removePhotoBtn.style.display = 'none';
                        }
    
                        // Rest of the existing code remains the same...
                        document.getElementById('name').value = profile.fullname || '';
                        document.getElementById('username').value = profile.username || '';
                        document.getElementById('bio').value = profile.bio || '';
    
                        if (profile.gender) {
                            genderSelect.value = profile.gender;
                        } else {
                            genderSelect.selectedIndex = 0;
                        }
    
                        // Update bio character count
                        const bioLength = (profile.bio || '').length;
                        charCount.textContent = `${bioLength}/150`;
                    }
                })
                .catch(error => {
                    console.error('Error fetching profile:', error);
                    alert('Failed to load profile settings');
                });
            }
        }
    }

    // Handle avatar upload and preview
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
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

    // Call to populate settings on page load
    populateProfileSettings();

    // Update form submission to log changes
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const token = getTokenFromCookie();
        if (!token) {
            alert('Authentication token not found');
            return;
        }

        // Collect current input values
        const currentName = document.getElementById('name').value;
        const currentUsername = document.getElementById('username').value;
        const currentBio = document.getElementById('bio').value;
        const currentGender = genderSelect.value;
        const currentAvatar = avatarUpload.files[0];
        const currentAvatarSrc = avatarImg.src;

        // Check if anything has changed
        const nameChanged = currentName !== originalProfileData.fullname;
        const usernameChanged = currentUsername !== originalProfileData.username;
        const bioChanged = currentBio !== originalProfileData.bio;
        const genderChanged = currentGender !== originalProfileData.gender;
        
        // Special avatar check
        const isDefaultAvatar = currentAvatarSrc.includes('default-user.png');
        const isOriginalDefaultAvatar = !originalProfileData.avt || 
            originalProfileData.avt.includes('default-user.png');
        const avatarChanged = currentAvatar || 
            (!isDefaultAvatar && !isOriginalDefaultAvatar && 
             currentAvatarSrc !== originalProfileData.avt);

        // If any changes detected, log all current input values
        if (nameChanged || usernameChanged || bioChanged || genderChanged || avatarChanged) {
            console.log('Current Input Values:', {
                name: currentName,
                username: currentUsername,
                bio: currentBio,
                gender: currentGender,
                avatar: currentAvatar ? currentAvatar.name : currentAvatarSrc
            });

            updateProfile(currentName, currentUsername, currentBio, currentGender, currentAvatar);
        } else {
            console.log('No update');
        }
    });

    // Call to populate settings on page load
    populateProfileSettings();


    // Function to update user profile
    function updateProfile(name, username, bio, gender, avatar) {
        const formData = new FormData();
        formData.append('fullname', name);
        formData.append('username', username);
        formData.append('bio', bio);
        formData.append('gender', gender);
    
        if (avatar) {
            formData.append('avatar', avatar);
        }
    
        const token = getTokenFromCookie();
    
        // Hiển thị overlay khi bắt đầu gửi request
        showLoadingOverlay();
    
        fetch('http://localhost:81/social-network/users/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        })
        .then(() => {
            alert('Profile updated successfully');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        })
        .finally(() => {
            // Ẩn overlay dù thành công hay gặp lỗi
            hideLoadingOverlay();
        });
    }

    function showLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }
    
    function hideLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'none';
    }

});