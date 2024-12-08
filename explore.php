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

<main class="explore__main-content-explore">
    <div class="explore__explore-container">
        
        <!-- Grid layout for posts -->
        <div class="explore__explore-grid">
            
            <!-- Explore Grid Item 1 -->
            <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=1', 'User 1', 'This is caption for post 1')">
                <img src="https://picsum.photos/300/300?random=1" alt="Post 1">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 2 -->
            <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=2', 'User 2', 'This is caption for post 2')">
            <img src="https://picsum.photos/300/300?random=2" alt="Post 2">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 3 -->
            <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=3', 'User 3', 'This is caption for post 3')">
            <img src="https://picsum.photos/300/300?random=3" alt="Post 3">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 4 -->
            <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=4', 'User 4', 'This is caption for post 4')">
            <img src="https://picsum.photos/300/300?random=4" alt="Post 4">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>


    <!-- Popup -->
    <div class="explore__popup" id="imagePopup" onclick="closePopup()">
        <span class="explore__popup-close">&times;</span>
        <div class="explore__popup-content" onclick="event.stopPropagation()">
            <div class="explore__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="explore__popup-details">
                <div class="explore__details-header">
                    <div class="explore__user-pic"></div>
                    <div class="explore__user-name">John Doe</div>
                </div>

                <div class="explore__details-comment">
                    <div class="explore__post-caption">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name">John Doe</div>
                        <div class="explore__user-caption">Hello hihihi Ngày xưa mình cũng có nhận một lớp nice thế và đến giờ mình vẫn siêu nhớ bé</div>
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
                        <a class="explore__share-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/share.svg') ?>
                        </a>

                    </div>
                    <a href="#" class="explore__details-save">Save</a>
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