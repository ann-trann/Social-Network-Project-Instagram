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


function truncateText(text, maxLength = 50) {
    if (!text) return 'No messages yet';
    
    // Trim whitespace and then truncate
    text = text.trim();
    
    if (text.length <= maxLength) {
        return text;
    }
    
    // Truncate and add ellipsis
    return text.substring(0, maxLength).trim() + '...';
}


//====================================================================================================
//============================================ Chat ==================================================
//====================================================================================================




async function getCurrentUserInfo() {
    try {
        // Fetch user info from the endpoint
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

        // Update the username in the DOM
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
        // Optionally, update the UI to show an error
        const usernameElement = document.querySelector('.message__username');
        if (usernameElement) {
            usernameElement.textContent = 'Error loading username';
        }
        return null;
    }
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', getCurrentUserInfo);





//---------------------------------------------------------------------------------------------------------



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




// // Hiển thị chat content khi click vào chat item
// document.addEventListener('DOMContentLoaded', function() {
//     const inputBox = document.querySelector('.message__input-box');
//     const sendButton = document.querySelector('.message__send-button');
//     const actionIcons = document.querySelectorAll('.message__image-icon, .message__like-icon');

//     inputBox.addEventListener('input', function() {
//         if (this.value.trim() !== '') {
//             sendButton.style.display = 'block';
//             actionIcons.forEach(icon => icon.style.display = 'none');
//         } else {
//             sendButton.style.display = 'none';
//             actionIcons.forEach(icon => icon.style.display = 'block');
//         }
//     });

//     // Để hiển thị chat content khi click vào chat item
//     const chatItems = document.querySelectorAll('.message__chat-item');
//     const chatEmpty = document.querySelector('.message__chat-empty');
//     const chatContent = document.querySelector('.message__chat-content');

//     chatItems.forEach(item => {
//         item.addEventListener('click', function() {
//             chatEmpty.classList.add('hidden');
//             chatContent.classList.remove('hidden');
//         });
//     });
// });





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



// --------------------------------------------------------------------------------------------------------


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
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
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

    console.log("conversation time:", conversation);

    // Truncate the last message
    const truncatedLastMessage = truncateText(conversation.lastMessage);

    // Calculate time difference
    const lastMessageTime = new Date(conversation.lastTimeMessage);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - lastMessageTime) / (1000 * 60)); // Difference in minutes

    let timeDifferenceText;
    if (timeDifference < 60) {
        timeDifferenceText = `${timeDifference} min`; // Less than 60 minutes
    } else if (timeDifference < 1440) {
        timeDifferenceText = `${Math.floor(timeDifference / 60)}h`; // Less than 24 hours
    } else if (timeDifference < 43200) { // Less than 30 days
        timeDifferenceText = `${Math.floor(timeDifference / 1440)}d`;
    } else if (timeDifference < 525600) { // Less than 1 year
        timeDifferenceText = `${Math.floor(timeDifference / 43200)}m`;
    } else {
        timeDifferenceText = `${Math.floor(timeDifference / 525600)}y`;
    }

    // Update to use img tag instead of background-image
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

// Function to load chat messages for a specific user
async function loadChatMessages(recipientId, offset = 0, limit = 200) {
    console.log("recipientId:", recipientId);
    try {
        const response = await fetch(`http://localhost:81/social-network/messages?recipientId=${recipientId}&offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${getTokenFromCookie()}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        console.log("data:", data.result);
        return data.result;
    } catch (error) {
        console.error('Error loading messages:', error);
        throw error;
    }
}

var des;

// Function to load chat content
async function loadChatContent(recipientId, username, userAvt) {
    const chatEmptyArea = document.querySelector('.message__chat-empty');
    const chatContentArea = document.querySelector('.message__chat-content');
    const chatHeader = document.querySelector('.message__chat-header');
    const usernameElement = chatHeader.querySelector('.message__chat-name');
    const messagesContainer = document.querySelector('.message__messages-container');
    const avatarElement = chatHeader.querySelector('.message__profile-pic');
    
    console.log("Debug Header Update:", {
        chatHeader,
        usernameElement,
        avatarElement,
        username,
        userAvt
    });

    // Cập nhật username
    if (usernameElement) {
        usernameElement.textContent = username || 'Unknown User';
    }

    // Cập nhật avatar
    if (avatarElement) {
        // Kiểm tra userAvt có giá trị
        if (userAvt) {
            // Nếu chưa có img, tạo mới
            let imgElement = avatarElement.querySelector('img');
            if (!imgElement) {
                imgElement = document.createElement('img');
                avatarElement.appendChild(imgElement);
            }
            
            imgElement.src = userAvt;
            imgElement.alt = username || 'User Avatar';
        } else {
            console.warn('No avatar URL provided');
            avatarElement.innerHTML = ''; // Xóa nội dung nếu không có avatar
        }
    }

    // Phần còn lại của hàm giữ nguyên
    chatEmptyArea.classList.add('hidden');
    chatContentArea.classList.remove('hidden');

    try {
        const messages = await loadChatMessages(recipientId);
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message__message');
            
            // Determine if message is sent or received
            console.log("sender_id: " +  message.sender_id + " " + getUserIdFromToken(getTokenFromCookie()));
            const isSentByCurrentUser = message.sender_id === getUserIdFromToken(getTokenFromCookie());
            console.log("true false: ", isSentByCurrentUser)
            messageElement.classList.add(isSentByCurrentUser ? 'message__sent' : 'message__received');
            
            // Create message content
            const messageContent = document.createElement('div');
            messageContent.classList.add('message__message-content');
            messageContent.textContent = message.text;
            
            // Add timestamp (optional)
            const timestamp = document.createElement('div');
            timestamp.classList.add('message__timestamp');
            const messageDate = new Date(message.createAt);
            timestamp.textContent = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Append elements
            messageElement.appendChild(messageContent);
            messageElement.appendChild(timestamp);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to bottom of messages
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        chatContentArea.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading chat content:', error);
        messagesContainer.innerHTML = '<div class="message__error">Error loading messages</div>';
    }
}



// Function to load chat data and populate chat list
async function loadChatData() {
    try {
        const conversations = await fetchChatData();
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = ''; // Clear existing chats

        console.log("conversations:", conversations);

        conversations.forEach(conversation => {
            const chatItem = createChatItem(conversation);
            chatItem.addEventListener('click', () => {
                loadChatContent(
                    conversation.userId, 
                    conversation.username,
                    conversation.userAvt  // Pass the user avatar URL
                );
                // Update URL
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
        console.log("initialChatId ", initialChatId)
        if (initialChatId) {
            const response = await fetch(`http://localhost:81/social-network/users/${initialChatId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            })
            .then (response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile.');
                } 
                return response.json();
            })
            .then (data => {
                if (data.result) {
                    const chatEmpty = document.querySelector('.message__chat-empty');
                    const chatContent = document.querySelector('.message__chat-content');
            
                    chatEmpty.classList.add('hidden');
                    chatContent.classList.remove('hidden');
                    des = data.result.userId
                    loadChatContent(data.result.userId, data.result.username, data.result.avt)
                }
            })
        }
    } catch (error) {
        console.error('Error loading chat data:', error);
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = `<div style="color: red;">Error loading chat data. Please try again later.</div>`;
    }
}

// Call the function to load chat data
document.addEventListener('DOMContentLoaded', loadChatData);

// ---------------------------------------------------------------------------------------

// Function to send a message to the recipient
document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.message__input-box');

    inputBox.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của Enter

            const messageText = inputBox.value.trim();
            if (messageText) {
                let recipient;
                if (getRecipientId()) {
                    const recipient = getRecipientId();
                } else {
                    recipient = des;
                }
                console.log('repid:, ', recipient)
                sendMessage(recipient, messageText);
                inputBox.value = ''; // Xóa nội dung input
            }
        }
    });
});

function getRecipientId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('chatId');
}

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
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.appendChild(messageContent);
        messageElement.appendChild(timestamp);
        
        messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        loadChatData();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}



// ---------------------------------------------------------------------------------------

// function toggleChatContent() {
//     const chatArea = document.querySelector('.message__chat-area');
//     const chatContent = document.querySelector('.message__chat-content');
    
//     chatContent.classList.remove('hidden');
// }



// document.addEventListener('DOMContentLoaded', toggleChatContent);



