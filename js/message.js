//====================================================================================================
//============================================ Sidebar ===============================================
//====================================================================================================

// Hiển thị sidebar-small khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    const sidebarSmall = document.querySelector('.sidebar-small');
    const sidebar = document.querySelector('.sidebar');
    sidebarSmall.style.display = 'flex'; // Hiển thị sidebar-small
    sidebar.style.display = 'none'; // Ẩn sidebar lớn

    // Thêm sự kiện cho nút search và notification
    const searchBtnSmall = document.getElementById('search-btn-small');
    const notificationBtnSmall = document.getElementById('notification-btn-small');

    // Thêm sự kiện cho nút search và notification
    searchBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        const searchSidebar = document.querySelector('.search__search-sidebar');
        searchSidebar.classList.toggle('active');
        // Hiển thị sidebar nhỏ và search sidebar
        sidebarSmall.style.display = 'flex'; // Đảm bảo sidebar nhỏ vẫn hiển thị
        searchSidebar.style.display = searchSidebar.classList.contains('active') ? 'flex' : 'none';
    });

    // Cập nhật sự kiện cho nút notification
    notificationBtnSmall.addEventListener('click', function(e) {
        e.preventDefault();
        const notificationSidebar = document.querySelector('.notification__notification-sidebar');
        notificationSidebar.classList.toggle('active');
        sidebarSmall.style.display = 'flex'; // Đảm bảo sidebar nhỏ vẫn hiển thị
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
//============================================ Chat ==================================================
//====================================================================================================


document.addEventListener('DOMContentLoaded', function() {
    // Function to update URL without adding to browser history
    function updateUrlWithChatId(chatId) {
        // Use replaceState to update URL without creating a new history entry
        history.replaceState(
            { chatId: chatId }, 
            '', 
            `?chatId=${chatId}`
        );
    }

    // Modify the existing chat item click event listener
    const chatItems = document.querySelectorAll('.message__chat-item');
    const chatEmpty = document.querySelector('.message__chat-empty');
    const chatContent = document.querySelector('.message__chat-content');

    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the chat ID from the item's ID attribute
            const chatId = this.id;

            // Update URL with chat ID
            updateUrlWithChatId(chatId);

            // Existing chat selection logic
            chatEmpty.classList.add('hidden');
            chatContent.classList.remove('hidden');

            // Update chat header with selected user's name
            const chatName = this.querySelector('.message__item-chat-name').textContent;
            const chatHeader = document.querySelector('.message__chat-name');
            chatHeader.textContent = chatName;
        });
    });

    // Optional: Handle back button to reset view if needed
    window.addEventListener('popstate', function(event) {
        // If no state is present, show empty chat area
        if (!event.state || !event.state.chatId) {
            chatEmpty.classList.remove('hidden');
            chatContent.classList.add('hidden');
        }
    });
});




// Hiển thị chat content khi click vào chat item
document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.message__input-box');
    const sendButton = document.querySelector('.message__send-button');
    const actionIcons = document.querySelectorAll('.message__image-icon, .message__like-icon');

    inputBox.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            sendButton.style.display = 'block';
            actionIcons.forEach(icon => icon.style.display = 'none');
        } else {
            sendButton.style.display = 'none';
            actionIcons.forEach(icon => icon.style.display = 'block');
        }
    });

    // Để hiển thị chat content khi click vào chat item
    const chatItems = document.querySelectorAll('.message__chat-item');
    const chatEmpty = document.querySelector('.message__chat-empty');
    const chatContent = document.querySelector('.message__chat-content');

    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            chatEmpty.classList.add('hidden');
            chatContent.classList.remove('hidden');
        });
    });
});





// Message send logic
document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.message__input-box');
    const sendButton = document.querySelector('.message__send-button');
    const messagesContainer = document.querySelector('.message__messages-container');
    const actionIcons = document.querySelectorAll('.message__image-icon, .message__like-icon');

    // Function to create a new message
    function createMessageElement(content, type = 'sent') {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message__message', `message__${type}`);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message__message-content');
        messageContent.textContent = content;
        
        messageWrapper.appendChild(messageContent);
        return messageWrapper;
    }

    // Function to send a message
    function sendMessage() {
        const messageText = inputBox.value.trim();
        
        if (messageText !== '') {
            // Create and prepend the new message (since messages are displayed in reverse)
            const newMessage = createMessageElement(messageText);
            messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
            
            // Clear input
            inputBox.value = '';
            
            // Reset UI
            sendButton.style.display = 'none';
            actionIcons.forEach(icon => icon.style.display = 'block');
        }
    }

    // Event listener for send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for Enter key
    inputBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault(); // Prevent default Enter key behavior
        }
    });

    // Input box event to toggle send button and icons
    inputBox.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            sendButton.style.display = 'block';
            actionIcons.forEach(icon => icon.style.display = 'none');
        } else {
            sendButton.style.display = 'none';
            actionIcons.forEach(icon => icon.style.display = 'block');
        }
    });

    // Chat item selection logic
    const chatItems = document.querySelectorAll('.message__chat-item');
    const chatEmpty = document.querySelector('.message__chat-empty');
    const chatContent = document.querySelector('.message__chat-content');

    chatItems.forEach(item => {
        item.addEventListener('click', function() {
            chatEmpty.classList.add('hidden');
            chatContent.classList.remove('hidden');

            // Update chat header with selected user's name
            const chatName = this.querySelector('.message__chat-name').textContent;
            const chatHeader = document.querySelector('.message__chat-name');
            chatHeader.textContent = chatName;
        });
    });
});













//---------------------------------------------------------

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

// Function to create chat item element
function createChatItem(conversation) {

    console.log("conversation:", conversation);
    const chatItem = document.createElement('div');
    chatItem.classList.add('message__chat-item');
    chatItem.setAttribute('id', conversation.username);

    // Update to use img tag instead of background-image
    chatItem.innerHTML = `
        <div class="message__item-profile-pic">
            <img src="${conversation.userAvt}" alt="${conversation.username}">
        </div>
        <div class="message__chat-info">
            <div class="message__item-chat-name">${conversation.username}</div>
            <div class="message__last-message-container">
                <div class="message__last-message">${conversation.lastMessage || 'No messages yet'}</div>
                <div class="message__last-message-divider">•</div>
                <div class="message__last-message-timeDifference">${conversation.lastTimeMessage}</div>
            </div>
        </div>
    `;

    if (!conversation.isRead) {
        chatItem.classList.add('unread');
    }

    return chatItem;
}

// Function to load chat messages for a specific user
async function loadChatMessages(recipientId, offset = 0, limit = 20) {
    try {
        const response = await fetch(`http://localhost:81/social-network/messages/${recipientId}?offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error loading messages:', error);
        throw error;
    }
}

// Function to load chat content
async function loadChatContent(recipientId, username) {
    const chatEmptyArea = document.querySelector('.message__chat-empty');
    const chatContentArea = document.querySelector('.message__chat-content');
    const chatHeader = document.querySelector('.message__chat-header');
    const messagesContainer = document.querySelector('.message__messages-container');

    chatEmptyArea.classList.add('hidden');
    chatHeader.querySelector('.message__chat-name').textContent = username;
    messagesContainer.innerHTML = '';

    try {
        const messages = await loadChatMessages(recipientId);
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add(
                'message__message',
                message.sender_id === getCurrentUserId() ? 'message__sent' : 'message__received'
            );
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message__message-content');
            messageContent.textContent = message.text;
            
            messageElement.appendChild(messageContent);
            messagesContainer.appendChild(messageElement);
        });

        chatContentArea.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading chat content:', error);
    }
}

// Function to load chat data and populate chat list
async function loadChatData() {
    try {
        const conversations = await fetchChatData();
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = ''; // Clear existing chats

        conversations.forEach(conversation => {
            const chatItem = createChatItem(conversation);
            chatItem.addEventListener('click', () => {
                loadChatContent(conversation.username, conversation.username);
                // Update URL
                history.replaceState(
                    { chat_id: conversation.username }, 
                    '', 
                    `?chat_id=${conversation.username}`
                );
            });
            chatList.appendChild(chatItem);
        });

        // Handle initial chat if URL has chatId
        const urlParams = new URLSearchParams(window.location.search);
        const initialChatId = urlParams.get('chatId');
        if (initialChatId) {
            const conversation = conversations.find(c => c.username === initialChatId);
            if (conversation) {
                loadChatContent(conversation.username, conversation.username);
            }
        }
    } catch (error) {
        console.error('Error loading chat data:', error);
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = `<div style="color: red;">Error loading chat data. Please try again later.</div>`;
    }
}

// Call the function to load chat data
document.addEventListener('DOMContentLoaded', loadChatData);




async function fetchUsernameById(userId) {
    try {
        const response = await fetch(`http://localhost:81/social-network/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getTokenFromCookie()}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        return data.result.username; // Trả về username từ kết quả
    } catch (error) {
        console.error("Error fetching username:", error);
        return "Unknown User"; // Trường hợp không lấy được username
    }
}

