<?php
require_once "core/init.php";
$page = 'home';
require "shared/sidebar.php";
require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>


<main class="home__main-content-home">
    <div class="home__left-sidebar"></div>
    
    <div class="home__feed-container">
        <!-- Stories section -->
        <div class="home__stories-container">
            <!-- Story items will be here -->
        </div>

        <!-- Posts feed -->
        <div class="home__posts-container">
            
        </div>
                
    </div>

    <!-- Right sidebar -->
    <div class="home__right-sidebar">
        <!-- User profile preview -->
        <a href="/Social-Network-Project-Instagram/profile" class="home__user-preview">
            <img src="" alt="Profile">
            <div class="home__user-info">
                <h4></h4>
                <p></p>
            </div>
        </a>
    </div>


    <!-- Popup -->
    <div class="global__popup" id="imagePopup" postId="" onclick="closePopup('home')">
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
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
            
        </div>


        <div class="global__like-overlay">
            <div class="global__like">
                <div class="global__like-header">
                    <h3>Likes</h3>
                    <a class="global__like-close-btn">
                        <i class="fas fa-times"></i>
                    </a>
                </div>
                <div class="global__like-list-followers">
                    <!-- Placeholder for dynamically added like items -->
                    <div class="global__like-item">
                        <div class="global__like-pic" style="background-image: url('default-avatar.png')"></div>
                        <div class="global__like-info">
                            <h4>username</h4>
                            <p>Full Name</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Like Popup -->
     

    <div class="home_like-overlay" style="display:none;">
        <div class="home_like">
            <div class="home_like-header">
                <h3>Followers</h3>
                <a class="home_like-close-btn"><i class="fas fa-times"></i></a>
            </div>
            <div class="like__list-followers">
                <div class="home_like-item">
                    <div class="home_like-pic"></div>
                    <div class="home_like-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
                <div class="home_like-item">
                    <div class="home_like-pic"></div>
                    <div class="home_like-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
            </div>
        </div>
    </div>




</main>

<script src="js/load-follow_like/like_handler.js"></script>
<script src="js/common.js"></script>
<script src="js/home.js"></script>
<script src="js/post_popup.js"></script>
