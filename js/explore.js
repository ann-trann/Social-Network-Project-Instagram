// Shows popup when image is clicked
function showPopup(imgSrc, user, caption, postId) {
    // Tạo URL với query parameter postId
    const postUrl = `http://localhost:8080/Social-Network-Project-Instagram/explore?postId=${postId}`;
    
    // Mở popup như bình thường
    document.getElementById('imagePopup').style.display = 'flex';
    document.getElementById('popupImg').src = imgSrc;
    
    // Thay thế URL hiện tại mà không thêm vào lịch sử
    history.replaceState(null, '', postUrl);
    
    document.body.style.overflow = 'hidden';
    document.querySelector('.explore__main-content-explore').style.overflow = 'hidden';
}

// Closes popup when close button is clicked
function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.explore__main-content-explore').style.overflow = 'auto';
    
    // Quay lại URL gốc không có query parameter, không thêm vào lịch sử
    history.replaceState(null, '', 'http://localhost:8080/Social-Network-Project-Instagram/explore');
}