// More dropdown sidebar
document.addEventListener('DOMContentLoaded', initializeMoreDropdown);

function initializeMoreDropdown() {
    const moreBtn = document.getElementById('more-btn');
    const moreDropdown = document.querySelector('.more-dropdown');

    addMoreButtonClickHandler(moreBtn, moreDropdown);
    addMoreOutsideClickHandler(moreBtn, moreDropdown);
}

function addMoreButtonClickHandler(moreBtn, moreDropdown) {
    moreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moreDropdown.classList.toggle('active');
        moreBtn.classList.toggle('active');
    });
}

function addMoreOutsideClickHandler(moreBtn, moreDropdown) {
    document.addEventListener('click', function(e) {
        if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
            moreDropdown.classList.remove('active');
            moreBtn.classList.remove('active');
        }
    });
}
