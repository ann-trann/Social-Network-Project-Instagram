//========================= SOCKET =========================

var sockUrl = 'http://localhost:81/social-network/ws';
var socket, stompClient;

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

function connectToSocket() {
    const token = getTokenFromCookie();
    if (token === '') {
        alert('Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại để sử dụng ở dụng');
        return;
    }
    socket = new SockJS(sockUrl + "?access_token=" + encodeURIComponent(token));
    stompClient = Stomp.over(socket);
    userId = getUserIdFromToken(token);

    const destination = `/user/${userId}/queue/messages`;
    stompClient.connect({}, () => {
        stompClient.subscribe(destination, (response) => {
            const data = JSON.parse(response.body);
            handleMessage(data);
        });
    });    
}


function getRecipientId() {
    return currentRecipientId;  // Sử dụng biến currentRecipientId từ chat system
}


function handleMessage(data) {
    if (data.type === 'CHAT') {
        const currentChatId = getRecipientId();
        if (data.sender === currentChatId) {
            const messagesContainer = document.querySelector('.message__messages-container');
            const messageElement = document.createElement('div');
            
            const isSentByCurrentUser = data.senderId === getUserIdFromToken(getTokenFromCookie());
            
            messageElement.classList.add(
                'message__message', 
                isSentByCurrentUser ? 'message__sent' : 'message__received'
            );
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message__message-content');
            messageContent.textContent = data.message;
            
            const timestamp = document.createElement('div');
            timestamp.classList.add('message__timestamp');
            const messageDate = new Date();
            timestamp.textContent = messageDate.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            messageElement.appendChild(messageContent);
            messageElement.appendChild(timestamp);
            
            messagesContainer.appendChild(messageElement);
            
            // Scroll to bottom after adding new message
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        loadChatData();
    } else {
        console.log('Received notification:', data);
    }
}

// Gọi kết nối socket khi trang được tải
document.addEventListener('DOMContentLoaded', connectToSocket);