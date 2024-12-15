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


