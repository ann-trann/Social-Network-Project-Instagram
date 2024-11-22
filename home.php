<?php
require_once "core/init.php";

// Kiểm tra đăng nhập trước khi cho phép truy cập trang home
if (!loggedIn()) {
    Redirect::to('login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>


<main class="main-content">
    <div class="left-sidebar">
    </div>
    <div class="feed-container">
        <!-- Stories section -->
        <div class="stories-container">
            <!-- Story items will be here -->
        </div>

        <!-- Posts feed -->
        <div class="posts-container">
            <!-- Post items will be here -->
            <div class="instagram-post">
                <div class="post-header">
                    <div class="profile-pic"></div>
                    <a href="#" class="username">beyouniquelyyou</a>
                    <div class="dots">...</div>
                </div>

                <div class="post-image-container">
                    <img src="plumeria.jpg" alt="Plumeria flower with text" class="post-image">
                </div>

                <div class="post-actions">
                    ♡ ⚪ ▽
                </div>

                <div class="likes">2,866 likes</div>

                <div class="caption">
                    beyouniquelyyou Always 💛
                </div>

                <div class="view-comments">
                    View all 8 comments
                </div>
            </div>
        </div>
                
    </div>

    <!-- Right sidebar -->
    <div class="right-sidebar">
        <!-- User profile preview -->
        <div class="user-preview">
            <img src="<?php echo url_for('/assets/images/profileImage/default-user.png'); ?>" alt="Profile">
            <div class="user-info">
                <h4>Username</h4>
                <p>Full Name</p>
            </div>
            <a href="#" class="switch-btn">Switch</a>
        </div>

        <!-- Suggestions -->
        <div class="suggestions">
            <div class="suggestions-header">
                <h4>Suggestions For You</h4>
                <a href="#">See All</a>
            </div>
            
            <div class="suggestion-item">
                <div class="suggestion-profile">
                    <div class="suggestion-pic"></div>
                    <div class="suggestion-info">
                        <a href="#" class="suggestion-username">user1</a>
                        <div class="suggestion-text">Followed by user2 + 3 more</div>
                    </div>
                </div>
                <div class="follow-button">Follow</div>
            </div>

            <div class="suggestion-item">
                <div class="suggestion-profile">
                    <div class="suggestion-pic"></div>
                    <div class="suggestion-info">
                        <a href="#" class="suggestion-username">user3</a>
                        <div class="suggestion-text">Follows you</div>
                    </div>
                </div>
                <div class="follow-button">Follow</div>
            </div>

            <div class="suggestion-item">
                <div class="suggestion-profile">
                    <div class="suggestion-pic"></div>
                    <div class="suggestion-info">
                        <a href="#" class="suggestion-username">user4</a>
                        <div class="suggestion-text">Suggested for you</div>
                    </div>
                </div>
                <div class="follow-button">Follow</div>
            </div>

        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/home.js"></script>
