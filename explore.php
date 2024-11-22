<?php
require_once "core/init.php";

$page = 'explore';

// Kiểm tra đăng nhập
if (!loggedIn()) {
    Redirect::to('login');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>

<main class="main-content-explore">
    <div class="explore-container">
        <!-- Search bar -->
        <!-- <div class="search-container">
            <input type="text" class="search-input" placeholder="Search">
        </div> -->

        <!-- Grid layout for posts -->
        <!-- <div class="posts-grid">
            <div class="post-item">
                
            </div>
        </div> -->
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/explore.js"></script>