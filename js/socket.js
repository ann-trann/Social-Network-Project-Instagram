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
            
        });
    });	

}

function handleMessage(data) {
    if (data.type === 'CHAT') {
        /*
            Xử lý khi tin nhắn đến
            Ví dụ nếu đang ở trang chat thì hiển thị tin nhắn, hiển thị ở phần conversation
        */
    } else {
        /**
         * Ngược lại, nếu là thông báo về like, comment, share, ...
         * hiển thị thông báo notification
         * Update notification sidebar -> có 1 màu đỏ ở đầu chẳng hạn
         */
    }
}