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


// // Cập nhật sự kiện cho nút tìm kiếm
// const searchSmall = document.getElementById('search-btn-small');
// searchSmall.addEventListener('click', function(e) {
//     e.preventDefault();
//     searchSidebar.classList.toggle('active');
//     sidebarSmall.style.display = searchSidebar.classList.contains('active') ? 'flex' : 'none';
// });