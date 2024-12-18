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
        <div class="home__user-preview">
            <img src="" alt="Profile">
            <div class="home__user-info">
                <h4></h4>
                <p></p>
            </div>
        </div>

        <!-- Suggestions -->
        <div class="home__suggestions">
            <div class="home__suggestions-header">
                <h4>Suggestions For You</h4>
            </div>
            
            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user1</a>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user2</a>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

        </div>
    </div>



    <!-- Post Popup -->
    <div class="home__popup" id="homeImagePopup" onclick="closeHomePopup()">
        <span class="home__popup-close">&times;</span>
        <div class="home__popup-content" onclick="event.stopPropagation()">
            <div class="home__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="home__popup-details">
                <div class="home__details-header">
                    <div class="home__user-pic"></div>
                    <div class="home__user-name"></div>
                </div>

                <div class="home__details-comment">
                    <div class="home__post-caption">
                        <div class="home__user-pic"></div>
                        <div class="home__user-name-caption">
                            <div class="home__user-name"></div>
                            <div class="home__user-caption"></div>
                        </div>
                    </div>
                    
                </div>

                <div class="home__details-action">
                    <div class="home__details-action-icons">
                        <a class="home__like-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                        </a>
                        <a class="home__comment-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                        </a>

                    </div>
                </div>
                
                <div class="home__like-count">2,171 likes</div>
                <div class="home__details-add-comment">
                    <span class="home__smile-icon">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/smile_icon.svg') ?>
                    </span>
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
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

<script src="js/load-follow_like/load_like_home.js"></script>
<script src="js/common.js"></script>
<script src="js/home.js"></script>
