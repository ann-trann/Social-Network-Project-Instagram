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
    <?php
    for ($i = 0; $i < 10; $i++) {
        echo '<div class="grid-item" onclick="showPopup(\'https://picsum.photos/300/300?random=' . $i . '\', \'User ' . ($i + 1) . '\', \'This is caption for post ' . ($i + 1) . '\')">';
        echo '<img src="https://picsum.photos/300/300?random=' . $i . '" alt="Post ' . ($i + 1) . '">';
        echo '</div>';
    }
    ?>
</div>

<div class="popup" id="popup">
    <div class="popup-content">
        <!-- Left: Image Section -->
        <div class="popup-image">
            <img id="popupImage" src="" alt="Popup Image">
        </div>

        <!-- Right: Information Section -->
        <div class="popup-info">
            <!-- User Info -->
            <div class="user-info">
                <img id="userAvatar" src="https://via.placeholder.com/40" alt="User Avatar" class="avatar">
                <span id="userName">User Name</span>
                <button class="btn-follow">Follow</button>
            </div>

            <!-- Caption -->
             <div class="caption-container">
            <div class="caption">
                
                <p id="captionText">This is a caption for the image.</p>
            </div>
            <div class="comment">
    
            </div>

            </div>

            <!-- Actions -->
            <div class="actions">
                <button class="btn-like">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/explore_svg/Like.svg') ?>
                </button>
                <button class="btn-comment">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/explore_svg/Comment.svg') ?>
                </button>
                <button class="btn-share">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/explore_svg/Share.svg') ?>
                </button>
                <button class="btn-save">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/explore_svg/Save.svg') ?>
                </button>
            

            <!-- Add a Comment -->
            <div class="add-comment">
                <div class = "border-comment">
                  <a href="#" class="add-icon">
                      <?php include(dirname(SHARED_PATH) . '/assets/svg/explore_svg/smile.svg') ?>
                  </a>
                  <input type="text" placeholder="Add a comment..." id="commentInput">
                </div>
                <button class="btn-post">Post</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Close Button -->
    <span class="popup-close" onclick="hidePopup()">&times;</span>
</div>

</main>

<link rel="stylesheet" href="css/explore.css">

<script src="js/common.js"></script>
<script src="js/explore.js"></script>