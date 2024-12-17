document.addEventListener('DOMContentLoaded', function() {
    initializeSearchSidebar();
    initializeSearchInputClear();
    initializeSearchNavigationHandlers();
});

// Initialize search sidebar
function initializeSearchSidebar() {
    const searchBtn = document.getElementById('search-btn');
    const sidebarSmall = document.querySelector('.sidebar-small');
    const searchSidebar = document.querySelector('.search__search-sidebar');

    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
        
        const searchBtn = document.getElementById('search-btn-small');
        searchBtn.classList.toggle('active');
    });
    
    const searchSmall = document.getElementById('search-btn-small');
    searchSmall.addEventListener('click', function(e) {
        e.preventDefault();
        searchSidebar.classList.remove('active');
        if (!window.location.pathname.includes('message')) {
            sidebarSmall.style.display = 'none';
        }
    });
}


// Initialize search input clear
function initializeSearchInputClear() {
    const searchInput = document.querySelector('.search__search-input input');
    const searchInputWrapper = document.querySelector('.search__search-input');
    const clearIcon = document.querySelector('.search__clear-icon');
    
    searchInput.addEventListener('input', function() {
        searchInputWrapper.classList.toggle('has-text', this.value.length > 0);
    });
    
    clearIcon.addEventListener('click', function() {
        searchInput.value = '';
        searchInputWrapper.classList.remove('has-text');
        searchInput.focus();
    });
}

// Initialize search navigation handlers
function initializeSearchNavigationHandlers() {
    const searchSidebar = document.querySelector('.search__search-sidebar');
    const sidebarSmall = document.querySelector('.sidebar-small');
    
    // Close search sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (searchSidebar.classList.contains('active')) {
            if (!searchSidebar.contains(e.target) && 
                !e.target.closest('#search-btn') && 
                !e.target.closest('#search-btn-small')) {
                searchSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        }
    });

    // Close search sidebar when clicking on navigation buttons
    const navButtons = document.querySelectorAll('.nav-item:not(#search-btn), .nav-item-small:not(#search-btn-small)');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (searchSidebar.classList.contains('active')) {
                searchSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        });
    });
}




//=========================================================================================================//


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search__search-input input');
    const searchResultContainer = document.querySelector('.search__search-result');

    // Function to get token from cookie
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

    // Function to render search results
    function renderSearchResults(results) {
        // Clear previous results
        searchResultContainer.innerHTML = '';
        

        // Check if results exist and are not empty
        if (results && results.length > 0) {
            results.forEach(user => {

                const resultItem = document.createElement('div');
                resultItem.classList.add('search__search-result-item');
                
                // Create user display structure
                resultItem.innerHTML = `
                    <div class="search__result-user-info" onclick="window.location.href='user?user_id=${user.userId}'">
                        <img src="${user.avt || '/default-avatar.png'}" alt="User Avatar" class="search__result-avatar">

                        <div class="search__result-user-details">
                            <p class="search__result-fullname">${user.fullname}</p>
                            <p class="search__result-username">@${user.username}</p>
                        </div>
                    </div>

                `;

                // Add click event to potentially navigate to user profile
                resultItem.addEventListener('click', () => {
                    // Redirect or open user profile
                    // window.location.href = `/profile/${user.userId}`;
                });

                searchResultContainer.appendChild(resultItem);
            });
        } else {
            // Show no results message
            searchResultContainer.innerHTML = `
                <div class="search__no-results">
                    <p>No users found</p>
                </div>
            `;
        }
    }

    // Debounce function to limit API calls
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

    // Search function
    function performSearch() {
        const token = getTokenFromCookie();
        const searchTerm = searchInput.value.trim();


        if (token) {
            fetch(`http://localhost:81/social-network/users/search?username=${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch search results.');
                }
                return response.json();
            })
            .then(data => {
                if (data.result) {
                    renderSearchResults(data.result);
                } else {
                    renderSearchResults([]);
                }
            })
            .catch(error => {
                console.error('Error searching users:', error);
                searchResultContainer.innerHTML = `
                    <div class="search__error">
                        <p>Error performing search</p>
                    </div>
                `;
            });
        } else {
            console.error('No token found');
            // Optional: Redirect to login or show login prompt
        }
    }

    // Add event listener with debounce
    searchInput.addEventListener('input', debounce(performSearch, 300));
});

