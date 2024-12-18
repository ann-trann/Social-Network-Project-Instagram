<?php
require_once "core/init.php"; 
$title = "Profile • Instagram";
$keywords = "Instagram profile, user profile, Instagram";

$page = 'profile';

require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}

// Include header/sidebar
require_once "shared/sidebar.php";
?>

<?php include_once "shared/global.sidebar.php"; ?>
<?php include_once "shared/global.sidebar_small.php"; ?>


<main class="profile__main-content-profile"> 
    <div class="profile__profile-container">
        <!-- Profile Header Section -->
        <header class="profile__profile-header">
            <div class="profile__profile-picture">
                <img src="" alt="Profile Picture">
            </div>
            
            <div class="profile__profile-info">
                <div class="profile__profile-title">
                    <h2 class="profile__username"></h2>
                    <button class="profile__edit-profile-btn" onclick="window.location.href='<?php echo url_for('/setting'); ?>'">Edit profile</button>
                    
                    <a class="profile__settings-option-btn">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/setting_option.svg') ?>
                    </a>
                </div>
                
                <div class="profile__profile-stats">
                    <span><strong>0</strong> posts</span>
                    <span class="profile__followers-stats"><strong>0</strong> followers</span>
                    <span class="profile__following-stats"><strong>0</strong> following</span>
                </div>
                
                <div class="profile__profile-bio">
                    <h1 class="profile__full-name"></h1>
                    <p class="profile__bio-text"></p>
                </div>
            </div>
        </header>

        <!-- Profile Content Section -->
        <div class="profile__profile-content">
            <div class="profile__content-nav">
                <div class="profile__posts active">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/profile/post_grid.svg') ?> POSTS
                </div>

            </div>

            <div class="profile__content-container">
                <div class="profile__profile-posts active">
                    
                    <div class="explore__explore-grid"> <!-- Reusing the explore grid class for consistency -->
                    </div>
                </div>

            </div>
        </div>
    </div>




    <!-- Setting post overlay -->
    <div class="profile__setting-overlay" style="display:none;">
        <div class="profile__setting-option-card">
            <a href="logout" class="profile__item-logout">Log out</a>
            <a class="profile__item-cancel">Cancel</a>
        </div>
    </div>


    <!-- Followers -->
    <div class="profile__followers-overlay" style="display:none;">
        <div class="profile__followers">
            <div class="profile__followers-header">
                <h3>Followers</h3>
                <a class="profile__followers-close-btn"><i class="fas fa-times"></i></a>
            </div>
            <div class="profile__list-followers">
                <div class="profile__followers-item">
                    <div class="profile__followers-pic"></div>
                    <div class="profile__followers-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
                <div class="profile__followers-item">
                    <div class="profile__followers-pic"></div>
                    <div class="profile__followers-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Following -->
    <div class="profile__following-overlay" style="display:none;">
        <div class="profile__following">
            <div class="profile__following-header">
                <h3>Following</h3>
                <a class="profile__following-close-btn"><i class="fas fa-times"></i></a>
            </div>
            <div class="profile__list-following">
                <div class="profile__following-item">
                    <div class="profile__following-pic"></div>
                    <div class="profile__following-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                    <div class="profile__following-action_btn">Following</div>
                </div>     
                <div class="profile__following-item">
                    <div class="profile__following-pic"></div>
                    <div class="profile__following-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                    <div class="profile__following-action_btn">Following</div>
                </div>     

            </div>
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

    
</main>


<script src="js/common.js"></script>
<script src="js/profile.js"></script>
<script src="js/post_popup.js"></script>
<script src="js/load-follow_like/load_follow_profile.js"></script>
