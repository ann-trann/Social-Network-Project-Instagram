// More dropdown sidebar
document.addEventListener('DOMContentLoaded', initializeMoreDropdown);

function initializeMoreDropdown() {
    const moreBtn = document.getElementById('more-btn');
    const moreDropdown = document.querySelector('.more__more-dropdown');

    addMoreButtonClickHandler(moreBtn, moreDropdown);
    addMoreOutsideClickHandler(moreBtn, moreDropdown);
}



document.addEventListener('DOMContentLoaded', initializeMoreDropdownSmall);

// Thêm sự kiện cho nút more-btn-small
function initializeMoreDropdownSmall() {
    const moreBtnSmall = document.getElementById('more-btn-small');
    const moreDropdown = document.querySelector('.more-dropdown');

    addMoreButtonClickHandler(moreBtnSmall, moreDropdown); // Sửa tên biến từ moreBtn thành moreBtnSmall
    addMoreOutsideClickHandler(moreBtnSmall, moreDropdown); // Sửa tên biến từ moreBtn thành moreBtnSmall
}




function addMoreButtonClickHandler(moreBtn, moreDropdown) {
    moreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moreDropdown.classList.toggle('active');
        moreBtn.classList.toggle('active');
    });
}

function addMoreOutsideClickHandler(moreBtn, moreDropdown) {
    if (moreBtn && moreDropdown) {
        document.addEventListener('click', function(e) {
            if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                moreDropdown.classList.remove('active');
                moreBtn.classList.remove('active');
            }
        });
    }
}



