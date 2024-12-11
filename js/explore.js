// Shows popup when image is clicked
function showPopup(imgSrc, user, caption) {
    document.getElementById('imagePopup').style.display = 'flex';
    document.getElementById('popupImg').src = imgSrc;
    document.getElementById('popupUser').textContent = user;
    document.getElementById('popupCaption').textContent = caption;
    document.body.style.overflow = 'hidden';
    document.querySelector('.explore__main-content-explore').style.overflow = 'hidden';
}

// Closes popup when close button is clicked
function closePopup() {
    document.getElementById('imagePopup').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('.explore__main-content-explore').style.overflow = 'auto';
}