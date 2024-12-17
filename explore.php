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
    <div class="explore__popup" id="imagePopup" onclick="closeExplorePopup()">
        <span class="explore__popup-close">&times;</span>
        <div class="explore__popup-content" onclick="event.stopPropagation()">
            <div class="explore__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="explore__popup-details">
                <div class="explore__details-header">
                    <div class="explore__user-pic"></div>
                    <div class="explore__user-name"></div>
                </div>

                <div class="explore__details-comment">
                    <div class="explore__post-caption">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name-caption">
                            <div class="explore__user-name"></div>
                            <div class="explore__user-caption"></div>
                        </div>
                    </div>

                    <div class="explore__post-comment">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name-caption">
                            <div class="explore__user-name">Petticoat </div>
                            <div class="explore__user-comment">Hello hihihi Ngày xưa mình cũng có nhận một lớp nice thế và đến giờ mình vẫn siêu nhớ bé</div>
                        </div>
                    </div>

                </div>

                <div class="explore__details-action">
                    <div class="explore__details-action-icons">
                        <a class="explore__like-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                        </a>
                        <a class="explore__comment-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                        </a>

                    </div>
                </div>
                
                <div class="explore__like-count">2,171 likes</div>
                <div class="explore__details-add-comment">
                    <span class="explore__smile-icon">
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