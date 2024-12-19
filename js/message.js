//====================================================================================================
//============================================ Sidebar ===============================================
//====================================================================================================

// Show sidebar-small when page loads
document.addEventListener('DOMContentLoaded', function() {
    const sidebarSmall = document.querySelector('.sidebar-small');
    const sidebar = document.querySelector('.sidebar');
    sidebarSmall.style.display = 'flex';
    sidebar.style.display = 'none';

    // Add events for search and notification buttons
    const searchBtnSmall = document.getElementById('search-btn-small');
    const notificationBtnSmall = document.getElementById('notification-btn-small');

    searchBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        const searchSidebar = document.querySelector('.search__search-sidebar');
        searchSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
        searchSidebar.style.display = searchSidebar.classList.contains('active') ? 'flex' : 'none';
    });

    notificationBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        const notificationSidebar = document.querySelector('.notification__notification-sidebar');
        notificationSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex';
        notificationSidebar.style.display = notificationSidebar.classList.contains('active') ? 'flex' : 'none';
    });
});

//====================================================================================================
//===================================== Toggle item sidebar ==========================================
//====================================================================================================

// Toggle search sidebar
document.getElementById('search-btn-small').addEventListener('click', function() {
    const searchBtn = document.getElementById('search-btn-small');
    const searchSidebar = document.querySelector('.search__search-sidebar');
    searchSidebar.classList.toggle('active');
    searchBtn.classList.toggle('active');
});

// Toggle notification sidebar
document.getElementById('notification-btn-small').addEventListener('click', function() {
    const notificationBtn = document.getElementById('notification-btn-small');
    const notificationSidebar = document.querySelector('.notification__notification-sidebar');
    notificationSidebar.classList.toggle('active');
    notificationBtn.classList.toggle('active');
});

// Toggle more dropdown
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.getElementById('more-btn-small');
    const moreDropdown = document.querySelector('.more__more-dropdown');

    if (moreBtn && moreDropdown) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            moreDropdown.classList.toggle('active');
            moreBtn.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                moreDropdown.classList.remove('active');
                moreBtn.classList.remove('active');
            }
        });
    }
});

//====================================================================================================
//============================================ Chat System ===========================================
//====================================================================================================

// Global variables for chat management
const MESSAGES_PER_PAGE = 20;
let currentPage = 0;
let isLoading = false;
let hasMoreMessages = true;
let currentRecipientId = null;

// Utility functions
function truncateText(text, maxLength = 50) {
    if (!text) return 'No messages yet';
    text = text.trim();
    return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...';
}

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

function decodeJWTToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

function getUserIdFromToken(token) {
    const decodedToken = decodeJWTToken(token);
    return decodedToken ? decodedToken.sub : null;
}

// User information management
async function getCurrentUserInfo() {
    try {
        const response = await fetch('http://localhost:81/social-network/users/my-info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }

        const data = await response.json();
        const username = data.result.username;

        const usernameElement = document.querySelector('.message__username');
        if (usernameElement) {
            usernameElement.textContent = username;
        }

        return {
            userId: data.result.user_id,
            username: username
        };
    } catch (error) {
        console.error('Error fetching current user info:', error);
        const usernameElement = document.querySelector('.message__username');
        if (usernameElement) {
            usernameElement.textContent = 'Error loading username';
        }
        return null;
    }
}

// Chat data fetching and rendering
async function fetchChatData() {
    try {
        const response = await fetch('http://localhost:81/social-network/messages/', {
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching chat data:', error);
        throw error;
    }
}

function createChatItem(conversation) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('message__chat-item');
    chatItem.setAttribute('id', conversation.username);

    const truncatedLastMessage = truncateText(conversation.lastMessage);
    const lastMessageTime = new Date(conversation.lastTimeMessage);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - lastMessageTime) / (1000 * 60));

    let timeDifferenceText;
    if (timeDifference < 60) {
        timeDifferenceText = `${timeDifference}m`;
    } else if (timeDifference < 1440) {
        timeDifferenceText = `${Math.floor(timeDifference / 60)}h`;
    } else if (timeDifference < 43200) {
        timeDifferenceText = `${Math.floor(timeDifference / 1440)}d`;
    } else if (timeDifference < 525600) {
        timeDifferenceText = `${Math.floor(timeDifference / 43200)}mo`;
    } else {
        timeDifferenceText = `${Math.floor(timeDifference / 525600)}y`;
    }

    chatItem.innerHTML = `
        <div class="message__item-profile-pic">
            <img src="${conversation.userAvt}" alt="${conversation.username}">
        </div>
        <div class="message__chat-info">
            <div class="message__item-chat-name">${conversation.username}</div>
            <div class="message__last-message-container">
                <div class="message__last-message">${truncatedLastMessage}</div>
                <div class="message__last-message-divider">•</div>
                <div class="message__last-message-timeDifference">${timeDifferenceText}</div>
            </div>
        </div>
    `;

    if (!conversation.isRead) {
        chatItem.classList.add('unread');
    }

    return chatItem;
}

// Message loading and rendering
async function loadChatMessages(recipientId, page = 0) {
    try {
        const offset = page * MESSAGES_PER_PAGE;
        const response = await fetch(
            `http://localhost:81/social-network/messages?recipientId=${recipientId}&offset=${offset}&limit=${MESSAGES_PER_PAGE}`,
            {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        hasMoreMessages = data.result.length === MESSAGES_PER_PAGE;
        return data.result;
    } catch (error) {
        console.error('Error loading messages:', error);
        throw error;
    }
}

function renderMessages(messages, container, shouldPrepend = false) {
    // Đảo ngược mảng tin nhắn để hiển thị theo đúng thứ tự thời gian
    const orderedMessages = messages;
    
    orderedMessages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message__message');

        const isSentByCurrentUser = message.sender_id === getUserIdFromToken(getTokenFromCookie());
        messageElement.classList.add(isSentByCurrentUser ? 'message__sent' : 'message__received');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message__message-content');
        messageContent.textContent = message.text;

        const timestamp = document.createElement('div');
        timestamp.classList.add('message__timestamp');
        const messageDate = new Date(message.createAt);
        timestamp.textContent = messageDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageElement.appendChild(messageContent);
        messageElement.appendChild(timestamp);

        if (shouldPrepend) {
            container.prepend(messageElement);
        } else {
            container.appendChild(messageElement);
        }
    });
}

async function loadChatContent(recipientId, username, userAvt) {
    if (currentRecipientId !== recipientId) {
        currentPage = 0;
        hasMoreMessages = true;
        currentRecipientId = recipientId;
        
        const messagesContainer = document.querySelector('.message__messages-container');
        messagesContainer.innerHTML = '';
    }

    const chatEmptyArea = document.querySelector('.message__chat-empty');
    const chatContentArea = document.querySelector('.message__chat-content');
    const chatHeader = document.querySelector('.message__chat-header');
    const usernameElement = chatHeader.querySelector('.message__chat-name');
    const avatarElement = chatHeader.querySelector('.message__profile-pic');

    // Update header information
    if (usernameElement) {
        usernameElement.textContent = username || 'Unknown User';
    }

    if (avatarElement) {
        if (userAvt) {
            let imgElement = avatarElement.querySelector('img');
            if (!imgElement) {
                imgElement = document.createElement('img');
                avatarElement.appendChild(imgElement);
            }
            imgElement.src = userAvt;
            imgElement.alt = username || 'User Avatar';
        } else {
            avatarElement.innerHTML = '';
        }
    }

    chatEmptyArea.classList.add('hidden');
    chatContentArea.classList.remove('hidden');

    try {
        const messages = await loadChatMessages(recipientId, currentPage);
        const messagesContainer = document.querySelector('.message__messages-container');
        
        renderMessages(messages, messagesContainer);

        // Infinite scroll handling
        messagesContainer.addEventListener('scroll', async function() {
            if (messagesContainer.scrollTop === 0 && !isLoading && hasMoreMessages) {
                isLoading = true;
                currentPage++;
                
                try {
                    const olderMessages = await loadChatMessages(recipientId, currentPage);
                    renderMessages(olderMessages, messagesContainer, true);
                } catch (error) {
                    console.error('Error loading older messages:', error);
                } finally {
                    isLoading = false;
                }
            }
        });

        // Scroll to bottom after loading initial messages
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        console.error('Error loading chat content:', error);
        const messagesContainer = document.querySelector('.message__messages-container');
        messagesContainer.innerHTML = '<div class="message__error">Error loading messages</div>';
    }
}

// Sửa lại phần gửi tin nhắn trong hàm sendMessage
async function sendMessage(recipientId, messageText) {
    try {
        const response = await fetch(`http://localhost:81/social-network/messages/${recipientId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`,
                'Content-Type': 'application/json'
            },
            body: messageText
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        const messagesContainer = document.querySelector('.message__messages-container');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message__message', 'message__sent');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message__message-content');
        messageContent.textContent = messageText;

        const timestamp = document.createElement('div');
        timestamp.classList.add('message__timestamp');
        timestamp.textContent = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageElement.appendChild(messageContent);
        messageElement.appendChild(timestamp);
        
        // Thêm tin nhắn mới ở cuối container
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        await loadChatData();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Chat list loading (continued)
async function loadChatData() {
    try {
        const conversations = await fetchChatData();
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = '';

        conversations.forEach(conversation => {
            const chatItem = createChatItem(conversation);
            chatItem.addEventListener('click', () => {
                loadChatContent(
                    conversation.userId,
                    conversation.username,
                    conversation.userAvt
                );
                history.replaceState(
                    { chatId: conversation.userId },
                    '',
                    `?chatId=${conversation.userId}`
                );
            });
            chatList.appendChild(chatItem);
        });

        // Handle initial chat if URL has chatId
        const urlParams = new URLSearchParams(window.location.search);
        const initialChatId = urlParams.get('chat_id');
        if (initialChatId) {
            try {
                const response = await fetch(`http://localhost:81/social-network/users/${initialChatId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${getTokenFromCookie()}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile.');
                }

                const data = await response.json();
                if (data.result) {
                    const chatEmpty = document.querySelector('.message__chat-empty');
                    const chatContent = document.querySelector('.message__chat-content');

                    chatEmpty.classList.add('hidden');
                    chatContent.classList.remove('hidden');
                    currentRecipientId = data.result.userId;
                    loadChatContent(data.result.userId, data.result.username, data.result.avt);
                }
            } catch (error) {
                console.error('Error loading initial chat:', error);
            }
        }
    } catch (error) {
        console.error('Error loading chat data:', error);
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = '<div class="message__error">Error loading chat data. Please try again later.</div>';
    }
}

// Initialize chat system
document.addEventListener('DOMContentLoaded', () => {
    loadChatData();
    getCurrentUserInfo();

    // Set up message input handling
    const inputBox = document.querySelector('.message__input-box');
    const sendButton = document.querySelector('.message__send-button');
    const actionIcons = document.querySelectorAll('.message__image-icon, .message__like-icon');

    // Handle input box changes
    inputBox.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            sendButton.style.display = 'block';
            actionIcons.forEach(icon => icon.style.display = 'none');
        } else {
            sendButton.style.display = 'none';
            actionIcons.forEach(icon => icon.style.display = 'block');
        }
    });

    // Handle message sending via Enter key
    inputBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const messageText = inputBox.value.trim();
            if (messageText) {
                const recipientId = currentRecipientId;
                if (recipientId) {
                    sendMessage(recipientId, messageText);
                    inputBox.value = '';
                }
            }
        }
    });

    // Handle message sending via send button
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const messageText = inputBox.value.trim();
            if (messageText && currentRecipientId) {
                sendMessage(currentRecipientId, messageText);
                inputBox.value = '';
            }
        });
    }
});