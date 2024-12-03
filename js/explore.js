function showPopup(imageUrl, userName, caption) {
    // Cập nhật nội dung popup
    document.getElementById("popupImage").src = imageUrl;
    document.getElementById("userName").textContent = userName;
    document.getElementById("captionText").textContent = caption;

    // Hiển thị popup
    document.getElementById("popup").style.display = "flex";
}

function hidePopup() {
    // Ẩn popup
    document.getElementById("popup").style.display = "none";
}

// app.js

// Mock API endpoint
const API_URL = "http://localhost:3000/api/messages";

// Function to fetch user profile data
async function fetchUserProfile() {
    const response = await fetch(`${API_URL}/user`);
    const data = await response.json();

    // Populate user profile
    document.getElementById("user-profile-pic").src = data.profilePic || "profile-placeholder.png";
    document.getElementById("user-username").textContent = data.username || "Username";
}

// Function to fetch conversations list
async function fetchConversations() {
    const response = await fetch(`${API_URL}/conversations`);
    const conversations = await response.json();

    const messageList = document.getElementById("message-list");
    messageList.innerHTML = ""; // Clear old data

    conversations.forEach((conv) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.onclick = () => loadChat(conv.id);

        messageDiv.innerHTML = `
            <img src="${conv.profilePic || 'profile-placeholder.png'}" alt="${conv.name}" class="message-pic">
            <div class="message-info">
                <span class="message-name">${conv.name} ${conv.verified ? '<span class="verified">✔</span>' : ''}</span>
                <span class="message-preview">${conv.preview}</span>
            </div>
        `;

        messageList.appendChild(messageDiv);
    });
}

// Function to load chat messages for a specific conversation
async function loadChat(conversationId) {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`);
    const chatData = await response.json();

    // Update chat header
    document.getElementById("chat-profile-pic").src = chatData.profilePic || "profile-placeholder.png";
    document.getElementById("chat-name").textContent = chatData.name || "Unknown User";
    document.getElementById("chat-profile-link").href = chatData.profileLink || "#";

    // Update chat messages
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = ""; // Clear old messages

    chatData.messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = msg.sentByUser ? "message-sent" : "message-received";
        messageDiv.textContent = msg.text;

        chatMessages.appendChild(messageDiv);
    });
}

// Load data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchUserProfile();
    fetchConversations();
});
