// More dropdown sidebar
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.getElementById('more-btn');
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



