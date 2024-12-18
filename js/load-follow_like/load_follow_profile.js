//================================================================================================//
//=====================================Load Followers Profile=====================================//


document.addEventListener('DOMContentLoaded', () => {
    const followersButton = document.querySelector('.profile__followers-stats');
    const followersOverlay = document.querySelector('.profile__followers-overlay');
    const closeButton = document.querySelector('.profile__followers-close-btn');

    // Function to get token from cookie
    function getTokenFromCookie() {
        const name = "token=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Function to fetch and update followers list
    function fetchAndUpdateFollowersList() {
        const followersListContainer = document.querySelector('.profile__list-followers');
        
        // Show loading indicator
        followersListContainer.innerHTML = '<div class="loading">Loading...</div>';

        // Fetch followers list
        fetch('http://localhost:81/social-network/users/my-followers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch followers list');
            }
            return response.json();
        })
        .then(data => {
            // Clear existing items
            followersListContainer.innerHTML = '';

            // Check if there are no followers
            if (!data.result || data.result.length === 0) {
                followersListContainer.innerHTML = '<p class="no-followers">No followers yet</p>';
                return;
            }

            // Iterate through followers and create list items
            data.result.forEach(user => {
                const followerItem = document.createElement('div');
                followerItem.className = 'profile__followers-item';
                
                followerItem.innerHTML = `
                    <div class="profile__followers-pic">
                        <img src="${user.avatar || '/default-avatar.png'}" alt="Profile Picture">
                    </div>
                    <div class="profile__followers-info">
                        <h4>${user.username}</h4>
                        <p>${user.fullname}</p>
                    </div>
                `;

                followersListContainer.appendChild(followerItem);
            });
        })
        .catch(error => {
            console.error('Error fetching followers list:', error);
            followersListContainer.innerHTML = '<p class="error">Error loading followers list. Please try again.</p>';
        });
    }

    // Function to show overlay and fetch followers list
    function showOverlay() {
        if (followersOverlay) {
            followersOverlay.style.display = 'flex';
            fetchAndUpdateFollowersList(); // Fetch list when overlay is shown
        }
    }

    // Function to hide overlay
    function hideOverlay() {
        if (followersOverlay) {
            followersOverlay.style.display = 'none';
        }
    }

    // Show overlay when followers button is clicked
    if (followersButton) {
        followersButton.addEventListener('click', (e) => {
            e.preventDefault();
            showOverlay();
        });
    }

    // Hide overlay when cancel button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            hideOverlay();
        });
    }

    // Optional: Close overlay when clicking outside the overlay
    if (followersOverlay) {
        followersOverlay.addEventListener('click', (e) => {
            if (e.target === followersOverlay) {
                hideOverlay();
            }
        });
    }
});




//================================================================================================//
//=====================================Load Following Profile=====================================//


document.addEventListener('DOMContentLoaded', () => {
    const followingButton = document.querySelector('.profile__following-stats');
    const followingOverlay = document.querySelector('.profile__following-overlay');
    const closeButton = document.querySelector('.profile__following-close-btn');

    // Function to get token from cookie
    function getTokenFromCookie() {
        const name = "token=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // Function to fetch and update following list
    function fetchAndUpdateFollowingList() {
        const followingListContainer = document.querySelector('.profile__list-following');
        
        // Show loading indicator
        followingListContainer.innerHTML = '<div class="loading">Loading...</div>';

        // Fetch following list
        fetch('http://localhost:81/social-network/users/my-following', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch following list');
            }
            return response.json();
        })
        .then(data => {
            // Clear existing items
            followingListContainer.innerHTML = '';

            // Check if there are no following users
            if (!data.result || data.result.length === 0) {
                followingListContainer.innerHTML = '<p class="no-following">No users being followed</p>';
                return;
            }

            // Iterate through following users and create list items
            data.result.forEach(user => {
                const followingItem = document.createElement('div');
                followingItem.className = 'profile__following-item';
                
                followingItem.innerHTML = `
                    <div class="profile__following-pic">
                        <img src="${user.avatar || '/default-avatar.png'}" alt="Profile Picture">
                    </div>
                    <div class="profile__following-info">
                        <h4>${user.username}</h4>
                        <p>${user.fullname}</p>
                    </div>
                    <div class="profile__following-action_btn">Following</div>
                `;

                followingListContainer.appendChild(followingItem);
            });
        })
        .catch(error => {
            console.error('Error fetching following list:', error);
            followingListContainer.innerHTML = '<p class="error">Error loading following list. Please try again.</p>';
        });
    }

    // Function to show overlay and fetch following list
    function showOverlay() {
        if (followingOverlay) {
            followingOverlay.style.display = 'flex';
            fetchAndUpdateFollowingList(); // Fetch list when overlay is shown
        }
    }

    // Function to hide overlay
    function hideOverlay() {
        if (followingOverlay) {
            followingOverlay.style.display = 'none';
        }
    }

    // Show overlay when following button is clicked
    if (followingButton) {
        followingButton.addEventListener('click', (e) => {
            e.preventDefault();
            showOverlay();
        });
    }

    // Hide overlay when cancel button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            hideOverlay();
        });
    }

    // Optional: Close overlay when clicking outside the overlay
    if (followingOverlay) {
        followingOverlay.addEventListener('click', (e) => {
            if (e.target === followingOverlay) {
                hideOverlay();
            }
        });
    }
});

