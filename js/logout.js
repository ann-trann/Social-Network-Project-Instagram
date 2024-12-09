document.addEventListener('DOMContentLoaded', () => {
    const logoutLinks = document.querySelectorAll('a[href="logout.php"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            // Attempt to logout via AJAX or direct navigation
            fetch('logout.php', {
                method: 'GET'
            })
            .then(response => {
                // Always redirect to login page
                window.location.href = 'login.php';
            })
            .catch(error => {
                // Fallback redirect
                window.location.href = 'login.php';
            });
        });
    });
});