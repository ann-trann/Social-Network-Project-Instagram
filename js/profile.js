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




//-------------------------------------------------------------------------------------------------------//
// Overlay for followers in the profile page

document.addEventListener('DOMContentLoaded', () => {
    const followersButton = document.querySelector('.profile__followers-stats');
    const followersOverlay = document.querySelector('.profile__followers-overlay');
    const closeButton = document.querySelector('.profile__follower-close-btn');

    // Function to show overlay
    function showOverlay() {
        if (followersOverlay) {
            followersOverlay.style.display = 'flex';
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






//-------------------------------------------------------------------------------------------------------//
// Overlay for following in the profile page

document.addEventListener('DOMContentLoaded', () => {
    const followingButton = document.querySelector('.profile__following-stats');
    const followingOverlay = document.querySelector('.profile__following-overlay');
    const closeButton = document.querySelector('.profile__following-close-btn');

    // Function to show overlay
    function showOverlay() {
        if (followingOverlay) {
            followingOverlay.style.display = 'flex';
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







//-------------------------------------------------------------------------------------------------------//
// Switch tabs in the profile page

document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links and content containers
    const navLinks = document.querySelectorAll('.profile__content-nav a');
    const contentContainers = document.querySelectorAll('.profile__content-container > div');

    // Function to switch tabs
    function switchTab(clickedLink) {
        // Remove active class from all navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        clickedLink.classList.add('active');

        // Determine the target content container class
        const targetClass = clickedLink.classList[0].replace('profile__', 'profile__profile-');
        
        // Hide all content containers
        contentContainers.forEach(container => {
            container.classList.remove('active');
        });

        // Show the corresponding content container
        const activeContainer = document.querySelector(`.${targetClass}`);
        if (activeContainer) {
            activeContainer.classList.add('active');
        }
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            switchTab(this);
        });
    });

    // Initially ensure the first tab is active
    const initialActiveLink = document.querySelector('.profile__content-nav a.active');
    if (initialActiveLink) {
        switchTab(initialActiveLink);
    }
});


