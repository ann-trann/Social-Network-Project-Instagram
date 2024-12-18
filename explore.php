<?php
require_once "core/init.php";

$page = 'explore';

require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}

// Kiểm tra nếu có postId được truyền vào
if (isset($_GET['postId'])) {
    $postId = $_GET['postId'];
    // Bạn có thể sử dụng $postId để load thông tin bài post cụ thể nếu cần
}

require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>

<main class="explore__main-content-explore">
    <div class="explore__explore-container">
        
        <!-- Grid layout for posts -->
        <div class="explore__explore-grid">
            
        </div>
    </div>


    <!-- Popup -->
    <div class="global__popup" id="imagePopup" postId="" onclick="closePopup('explore')">
        <span class="global__popup-close">&times;</span>
        <div class="global__popup-content" onclick="event.stopPropagation()">
            <div class="global__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="global__popup-details">
                <div class="global__details-header">
                    <div class="global__user-pic"></div>
                    <div class="global__user-name"></div>
                </div>

                <div class="global__details-comment">
                    <div class="global__post-caption">
                        <div class="global__user-pic"></div>
                        <div class="global__user-name-caption">
                            <div class="global__user-name"></div>
                            <div class="global__user-caption"></div>
                        </div>
                    </div>
                </div>

                <div class="global__details-action">
                    <div class="global__details-action-icons">
                        <a class="global__like-post" data-liked="" data-post-id="${postId}">
                        </a>
                        <a class="global__comment-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                        </a>

                    </div>
                </div>
                
                <div class="global__like-count"></div>
                <div class="global__details-add-comment">
                    <span class="global__smile-icon">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/smile_icon.svg') ?>
                    </span>
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
            
        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/explore.js"></script>
<script src="js/post_popup.js"></script>