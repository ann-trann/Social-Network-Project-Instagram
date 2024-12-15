document.addEventListener('DOMContentLoaded', function() {
    initializeNotificationSidebar();
    initializeNotificationNavigationHandlers();
});

// Initialize notification sidebar
function initializeNotificationSidebar() {
    const notificationBtn = document.getElementById('notification-btn');
    const sidebarSmall = document.querySelector('.sidebar-small');
    const notificationSidebar = document.querySelector('.notification__notification-sidebar');

    // Cập nhật sự kiện cho nút notification
    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        notificationSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
        
        const notificationBtn = document.getElementById('notification-btn-small');
        notificationBtn.classList.toggle('active');
    });
    
    const notificationSmall = document.getElementById('notification-btn-small');
    notificationSmall.addEventListener('click', function(e) {
        e.preventDefault();
        notificationSidebar.classList.remove('active');
        if (!window.location.pathname.includes('message')) {
            sidebarSmall.style.display = 'none';
        }
    });
}



// Initialize notification navigation handlers
function initializeNotificationNavigationHandlers() {
    const notificationSidebar = document.querySelector('.notification__notification-sidebar');
    const sidebarSmall = document.querySelector('.sidebar-small');
    
    // Close notification sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (notificationSidebar.classList.contains('active')) {
            if (!notificationSidebar.contains(e.target) && 
                !e.target.closest('#notification-btn') && 
                !e.target.closest('#notification-btn-small')) {
                notificationSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        }
    });

    // Close notification sidebar when clicking on navigation buttons
    const navButtons = document.querySelectorAll('.nav-item:not(:nth-of-type(5)), .nav-item-small:not(:nth-of-type(5))');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (notificationSidebar.classList.contains('active')) {
                notificationSidebar.classList.remove('active');
                sidebarSmall.style.display = 'none';
            }
        });
    });
}