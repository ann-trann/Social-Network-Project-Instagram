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


document.addEventListener('DOMContentLoaded', function() {
    // Function to update URL without adding to browser history
    function updateUrlWithChatId(chatId) {
        // Use replaceState to update URL without creating a new history entry
        history.replaceState(
            { chatId: chatId }, 
            '', 
            `?chat=${chatId}`
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
// Get chat data from JSON file and populate chat list

// Modify the existing loadChatData function
async function loadChatData() {
    try {
        // Fetch data from chat_data.json using a relative path
        const response = await fetch('./js/chat_data.json');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse JSON data
        const usersData = await response.json();

        // Get the chat list container
        const chatList = document.querySelector('.message__chat-list');
        const chatEmptyArea = document.querySelector('.message__chat-empty');
        const chatContentArea = document.querySelector('.message__chat-content');
        const chatHeader = document.querySelector('.message__chat-header');
        const messagesContainer = document.querySelector('.message__messages-container');

        // Function to update URL without adding to browser history
        function updateUrlWithChatId(chatId) {
            history.replaceState(
                { chatId: chatId }, 
                '', 
                `?chat=${chatId}`
            );
        }

        // Function to create chat item
        function createChatItem(user) {
            const chatItem = document.createElement('div');
            chatItem.classList.add('message__chat-item');
            chatItem.setAttribute('id', user.id);

            const lastMessageTime = new Date(user.lastMessageTime);
            const currentTime = new Date();
            const timeDifference = Math.floor((currentTime - lastMessageTime) / (1000 * 60)); // Difference in minutes
            let timeDifferenceText;
            if (timeDifference < 60) {
                timeDifferenceText = `${timeDifference} min`;
            } else if (timeDifference < 1440) {
                timeDifferenceText = `${Math.floor(timeDifference / 60)}h`;
            } else if (timeDifference < 43200) { // Less than 30 days
                timeDifferenceText = `${Math.floor(timeDifference / 1440)}d`;
            } else if (timeDifference < 525600) { // Less than 1 year
                timeDifferenceText = `${Math.floor(timeDifference / 43200)}m`;
            } else {
                timeDifferenceText = `${Math.floor(timeDifference / 525600)}y`;
            }

            chatItem.innerHTML = `
                <div class="message__item-profile-pic"></div>
                <div class="message__chat-info">
                    <div class="message__item-chat-name">${user.name}</div>

                    <div class="message__last-message-container">
                        <div class="message__last-message">${user.lastMessage}</div>
                        <div class="message__last-message-divider">•</div>
                        <div class="message__last-message-timeDifference">${timeDifferenceText}</div>
                    </div>
                </div>
            `;

            // Add click event listener
            chatItem.addEventListener('click', function() {
                // Update URL with chat ID
                updateUrlWithChatId(user.id);

                // Hide empty chat area
                chatEmptyArea.classList.add('hidden');
                
                // Update chat header
                const chatNameElement = chatHeader.querySelector('.message__chat-name');
                chatNameElement.textContent = user.name;

                // Clear previous messages
                messagesContainer.innerHTML = '';

                // Add messages for this user
                user.messages.slice().reverse().forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add(
                        'message__message', 
                        `message__${message.type}`
                    );

                    messageElement.innerHTML = `
                        <div class="message__message-content">${message.content}</div>
                    `;

                    messagesContainer.appendChild(messageElement);
                });

                // Show chat content area
                chatContentArea.classList.remove('hidden');
            });

            return chatItem;
        }

        // Populate chat list
        usersData.users.forEach(user => {
            const chatItem = createChatItem(user);
            chatList.appendChild(chatItem);
        });

        // Check if there's a chat ID in the URL on page load
        const urlParams = new URLSearchParams(window.location.search);
        const initialChatId = urlParams.get('chat');
        
        if (initialChatId) {
            const initialChatItem = document.getElementById(initialChatId);
            if (initialChatItem) {
                initialChatItem.click(); // Simulate click to load chat
            }
        }

    } catch (error) {
        console.error('Error loading chat data:', error);
        
        // Optional: Display an error message to the user
        const chatList = document.querySelector('.message__chat-list');
        chatList.innerHTML = `<div style="color: red;">Error loading chat data. Please try again later.</div>`;
    }
}

// Call the function to load chat data
document.addEventListener('DOMContentLoaded', loadChatData);


//---------------------------------------------------------

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
