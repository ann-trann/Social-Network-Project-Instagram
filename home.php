<?php
require_once "core/init.php";

$page = 'home';

// Kiểm tra đăng nhập trước khi cho phép truy cập trang home
if (!loggedIn()) {
    Redirect::to('login');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
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
            <!-- Post item 1 -->
            <div class="home__instagram-post">
                <div class="home__post-header">
                    <div class="home__profile-pic"></div>
                    <a href="<?php echo $user['username']; ?>" class="home__username">beyouniquelyyou</a>
                    <div class="home__dots">...</div>
                </div>

                <div class="home__post-image-container">
                    <img src="<?php echo url_for('/assets/images/postImage/image1.jpg'); ?>" alt="Image 1" class="home__post-image">
                </div>

                <div class="home__post-actions">
                    <a class="home__like-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                    </a>
                    <a class="home__comment-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                    </a>
                    <a class="home__share-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/share.svg') ?>
                    </a>
                </div>

                <div class="home__likes">2,866 likes</div>
                <div class="home__username-caption">beyouniquelyyou</div>
                <div class="home__caption">Always 💛</div>
                <div class="home__view-comments">View all 8 comments</div>
            </div>

            
            <!-- Post item 2 -->
            <div class="home__instagram-post">
                <div class="home__post-header">
                    <div class="home__profile-pic"></div>
                    <a href="#" class="home__username">leanneansar</a>
                    <div class="home__dots">...</div>
                </div>

                <div class="home__post-image-container">
                    <img src="<?php echo url_for('/assets/images/postImage/image2.jpg'); ?>" alt="Image 2" class="home__post-image">
                </div>

                <div class="home__post-actions">
                    <a class="home__like-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                    </a>
                    <a class="home__comment-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                    </a>
                    <a class="home__share-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/share.svg') ?>
                    </a>
                </div>

                <div class="home__likes">2,866 likes</div>
                <div class="home__username-caption">leanneansar</div>
                <div class="home__caption">I don’t know if it’s too early to say this but I’m so excited for the new year. I really look forward to starting a new chapter. How great that in life we have a day that allows us to “start over” fresh. It’s really incredible. I believe I’ve finally found my balance in life and feel 2025 is going to be it! I can’t wait to share with you so many news… all coming in 2025. ♥️</div>
                <div class="home__view-comments">View all 8 comments</div>
            </div>

            
        </div>
                
    </div>

    <!-- Right sidebar -->
    <div class="home__right-sidebar">
        <!-- User profile preview -->
        <div class="home__user-preview">
            <img src="<?php echo url_for('/assets/images/profileImage/default-user.png'); ?>" alt="Profile">
            <div class="home__user-info">
                <h4>Username</h4>
                <p>Full Name</p>
            </div>
            <a href="#" class="home__switch-btn">Switch</a>
        </div>

        <!-- Suggestions -->
        <div class="home__suggestions">
            <div class="home__suggestions-header">
                <h4>Suggestions For You</h4>
                <a href="#">See All</a>
            </div>
            
            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user1</a>
                        <div class="home__suggestion-text">Followed by user2 + 3 more</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user3</a>
                        <div class="home__suggestion-text">Follows you</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user4</a>
                        <div class="home__suggestion-text">Suggested for you</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/home.js"></script>
