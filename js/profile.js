//-------------------------------------------------------------------------------------------------------//
// Overlay for settings in the profile page

document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.querySelector('.profile__settings-option-btn');
    const settingsOverlay = document.querySelector('.profile__setting-overlay');
    const cancelButton = document.querySelector('.profile__item-cancel');

    // Function to show overlay
    function showOverlay() {
        if (settingsOverlay) {
            settingsOverlay.style.display = 'flex';
        }
    }

    // Function to hide overlay
    function hideOverlay() {
        if (settingsOverlay) {
            settingsOverlay.style.display = 'none';
        }
    }

    // Show overlay when settings button is clicked
    if (settingsButton) {
        settingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            showOverlay();
        });
    }

    // Hide overlay when cancel button is clicked
    if (cancelButton) {
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            hideOverlay();
        });
    }

    // Optional: Close overlay when clicking outside the overlay
    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', (e) => {
            if (e.target === settingsOverlay) {
                hideOverlay();
            }
        });
    }
});



// =========================================================================================================//
// =========================================================================================================//




// Utility function to get token from cookie
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




// =========================================================================================================//
// =========================================================================================================//
// =========================================================================================================//



document.addEventListener('DOMContentLoaded', () => {

    // Function to decode JWT token
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

    // Function to render profile details
    function renderProfile(profile) {
        // Update profile picture
        const profilePicture = document.querySelector('.profile__profile-picture img');
        profilePicture.src = profile.avt || "./assets/images/profileImage/default-user.png";

        // Update username
        const username = document.querySelector('.profile__username');
        username.textContent = profile.username || "Unnamed User";

        // Update profile stats
        const postStats = document.querySelector('.profile__profile-stats span:first-child strong');
        const followersStats = document.querySelector('.profile__followers-stats strong');
        const followingStats = document.querySelector('.profile__following-stats strong');

        postStats.textContent = profile.numberOfPost || "0";
        followersStats.textContent = profile.numberOfFollower || "0";
        followingStats.textContent = profile.numberOfFollowing || "0";

        // Update full name and bio
        const fullName = document.querySelector('.profile__full-name');
        const bioText = document.querySelector('.profile__bio-text');

        fullName.textContent = profile.fullname || "No Name";
        bioText.textContent = profile.bio || "No bio available";

        // Render profile posts
        const postGrid = document.querySelector('.explore__explore-grid');
        postGrid.innerHTML = ''; // Clear existing posts

        if (profile.postProfileResponses && profile.postProfileResponses.length > 0) {
            profile.postProfileResponses.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('explore__grid-item');
            postItem.innerHTML = `
                <img src="${post.postImg}" alt="Profile Post">
                <div class="explore__overlay">
                <div class="explore__overlay-stats">
                    <div class="explore__stat-item">
                    <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                    <span>${post.numberOfLike || 0}</span>
                    </div>
                    <div class="explore__stat-item">
                    <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                    <span>${post.numberOfComment || 0}</span>
                    </div>
                </div>
                </div>
            `;
            postItem.addEventListener('click', () => {
                showPopup(post.postId, 'profile');
            });
            postGrid.appendChild(postItem);
            });
        } else {
            // Show no posts message if no posts exist
            const noPostsMessage = `
                <div class="profile__no-posts">
                    <div class="profile__camera-icon">
                        <i class="fas fa-camera"></i>
                    </div>
                    <h2>No Posts Yet</h2>
                </div>
            `;
            postGrid.innerHTML = noPostsMessage;
        }
    }

    // Main execution
    const token = getTokenFromCookie();

    if (token) {
        const decodedToken = decodeJWTToken(token);
        
        if (decodedToken && decodedToken.sub) {
            const userId = decodedToken.sub;

            // Fetch user profile data
            fetch(`http://localhost:81/social-network/users/${userId}`, {
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
                    renderProfile(data.result);

                } else {
                    console.error('No profile data found');
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                // Optional: Show user-friendly error message
            });
        } else {
            console.error('Invalid token');
        }
    } else {
        console.error('No token found');
        // Optional: Redirect to login page
        window.location.href = 'login';
    }
});