//====================================================================================================
//======================================= Notification System =========================================
//====================================================================================================

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
    console.log("ASSADA")
    return "";
}

// Function to fetch notifications from the server 
async function fetchNotifications() {
    try {
        const response = await fetch('http://localhost:81/social-network/notifications/', {
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

// Function to create a notification item element
function createNotificationElement(notification) {
    const notificationItem = document.createElement('div');
    notificationItem.classList.add('notification__item');

    notificationItem.innerHTML = `
        <div class="notification__avatar">
            <img src="${notification.avtUrl}" alt="User avatar" class="notification__avatar-img">
        </div>
        <div class="notification__content">
            <p class="notification__message">${notification.message}</p>
            <div class="notification__type">${notification.type}</div>
        </div>
    `;

    notificationItem.addEventListener('click', () => {
        handleNotificationClick(notification);
    });

    return notificationItem;
}

// Function to handle notification click based on type
function handleNotificationClick(notification) {
    if (notification.type === 'like' || notification.type === 'comment') {
        window.location.href = `/user?user_id=${notification.userId}&postId=${notification.destinationId}`;
    } else if (notification.type === 'Follow') {
        window.location.href = `/user?user_id=${notification.userId}`;
    }
}

// Function to load and display notifications
async function loadNotifications() {
    const notificationBody = document.querySelector('.notification__notification-body');
    
    try {
        const notifications = await fetchNotifications();
        notificationBody.innerHTML = '';

        if (notifications.length === 0) {
            notificationBody.innerHTML = '<div class="notification__empty">No notifications</div>';
            return;
        }

        notifications.forEach(notification => {
            const notificationElement = createNotificationElement(notification);
            notificationBody.appendChild(notificationElement);
        });
    } catch (error) {
        console.error('Error loading notifications:', error);
        notificationBody.innerHTML = '<div class="notification__error">Failed to load notifications</div>';
    }
}

// Initialize notification sidebar
function initializeNotificationSidebar() {
    const notificationBtn = document.getElementById('notification-btn');
    const sidebarSmall = document.querySelector('.sidebar-small');
    const notificationSidebar = document.querySelector('.notification__notification-sidebar');

    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        notificationSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
        
        const notificationBtnSmall = document.getElementById('notification-btn-small');
        notificationBtnSmall.classList.toggle('active');

        // Load notifications when sidebar becomes visible
        if (notificationSidebar.classList.contains('active')) {
            loadNotifications();
        }
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
                if (!window.location.pathname.includes('message')) {
                    sidebarSmall.style.display = 'none';
                }
            }
        }
    });

    // Close notification sidebar when clicking navigation buttons
    const navButtons = document.querySelectorAll('.nav-item:not(:nth-of-type(5)), .nav-item-small:not(:nth-of-type(5))');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (notificationSidebar.classList.contains('active')) {
                notificationSidebar.classList.remove('active');
                if (!window.location.pathname.includes('message')) {
                    sidebarSmall.style.display = 'none';
                }
            }
        });
    });
}

// Add styles for notifications
const notificationStyles = `
    .notification__item {
        display: flex;
        padding: 12px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .notification__item:hover {
        background-color: #f7f7f7;
    }

    .notification__avatar {
        width: 40px;
        height: 40px;
        margin-right: 12px;
    }

    .notification__avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .notification__content {
        flex: 1;
    }

    .notification__message {
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
    }

    .notification__type {
        font-size: 12px;
        color: #65676B;
        margin-top: 4px;
    }

    .notification__empty {
        text-align: center;
        padding: 20px;
        color: #65676B;
    }

    .notification__error {
        text-align: center;
        padding: 20px;
        color: #dc3545;
    }

    .notification__notification-sidebar {
        position: fixed;
        right: 72px;
        top: 0;
        width: 360px;
        height: 100vh;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: none;
        flex-direction: column;
        z-index: 1000;
    }

    .notification__notification-sidebar.active {
        display: flex;
    }

    .notification__notification-header {
        padding: 16px;
        border-bottom: 1px solid #eee;
    }

    .notification__notification-header h3 {
        margin: 0;
        font-size: 24px;
    }

    .notification__notification-body {
        flex: 1;
        overflow-y: auto;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNotificationSidebar();
    initializeNotificationNavigationHandlers();
});