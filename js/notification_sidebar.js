document.addEventListener('DOMContentLoaded', initializeNotificationSidebar);

function initializeNotificationSidebar() {
    const elements = {
        notificationBtn: document.querySelector('.nav-item:nth-of-type(5)'),
        notificationBtnSmall: document.querySelector('.nav-item-small:nth-of-type(5)'),
        sidebarSmall: document.querySelector('.sidebar-small'),
        sidebar: document.querySelector('.sidebar'),
        notificationSidebar: document.querySelector('.notification-sidebar'),
        searchSidebar: document.querySelector('.search-sidebar')
    };

    setupNotificationToggle(elements);
    setupCloseNotification(elements);
    setupNotificationOutsideClickHandler(elements);
    setupNotificationNavigationHandlers(elements);
}

// Open notification sidebar when clicking on notification button
function setupNotificationToggle({ notificationBtn, sidebarSmall, notificationSidebar }) {
    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        notificationSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
    });
}

// Close notification sidebar when clicking on close button
function setupCloseNotification({ notificationBtnSmall, sidebarSmall, notificationSidebar }) {
    notificationBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        notificationSidebar.classList.remove('active');
        sidebarSmall.style.display = 'none';
    });
}

// Close notification sidebar when clicking outside
function setupNotificationOutsideClickHandler({ notificationSidebar, sidebarSmall }) {
    document.addEventListener('click', function(e) {
        if (notificationSidebar.classList.contains('active')) {
            if (!notificationSidebar.contains(e.target) && 
                !e.target.closest('#more-btn') && 
                !e.target.closest('#more-btn-small') &&
                !e.target.closest('[data-nav="create"]')) {
                notificationSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        }
    });
}

// Close notification sidebar when clicking on navigation buttons
function setupNotificationNavigationHandlers({ notificationSidebar, sidebarSmall, searchSidebar }) {
    const navigationButtons = document.querySelectorAll('.nav-item:nth-of-type(1), .nav-item:nth-of-type(2), .nav-item:nth-of-type(3), .nav-item:nth-of-type(4)');
    const navigationButtonsSmall = document.querySelectorAll('.nav-item-small:nth-of-type(1), .nav-item-small:nth-of-type(2),.nav-item-small:nth-of-type(3), .nav-item-small:nth-of-type(4)');
    const searchBtn = document.querySelector('.nav-item:nth-of-type(2)');
    const searchBtnSmall = document.querySelector('.nav-item-small:nth-of-type(2)');


    [...navigationButtons, ...navigationButtonsSmall].forEach(button => {
        button.addEventListener('click', function() {
            if (notificationSidebar.classList.contains('active')) {
                notificationSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        });
    });


    // // Handle search button specifically
    // [searchBtn, searchBtnSmall].forEach(button => {
    //     button.addEventListener('click', function() {
    //         if (notificationSidebar.classList.contains('active')) {
    //             notificationSidebar.classList.remove('active');
    //             searchSidebar.classList.add('active');
    //         }
    //     });
    // });
}