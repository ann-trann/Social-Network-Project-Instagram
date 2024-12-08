function showPopup(imgSrc, user, caption) {
    document.getElementById('imagePopup').style.display = 'flex';
    document.getElementById('popupImg').src = imgSrc;
    document.getElementById('popupUser').textContent = user;
    document.getElementById('popupCaption').textContent = caption;
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.body.style.overflow = 'auto';
}