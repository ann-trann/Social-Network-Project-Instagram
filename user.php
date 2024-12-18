<?php
require_once "core/init.php"; 
$title = "Profile • Instagram";
$keywords = "Instagram profile, user profile, Instagram";

$page = 'user';

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


<main class="user__main-content-user"> 
    <div class="user__profile-container">
        <!-- user Header Section -->
        <header class="user__profile-header">
            <div class="user__profile-picture">
                <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="Profile Picture">
            </div>
            
            <div class="user__profile-info">
                <div class="user__profile-title">
                    <h2 class="user__username"></h2>
                    <button class="user__follow-btn">Follow</button>
                    <button class="user__message-btn" data-user-id="<?php echo $_GET['user_id'] ?>">Message</button>
                </div>
                
                <div class="user__profile-stats">
                    <span><strong>0</strong> posts</span>
                    <span class="user__followers-stats"><strong>0</strong> followers</span>
                    <span class="user__following-stats"><strong>0</strong> following</span>
                </div>
                
                <div class="user__profile-bio">
                    <h1 class="user__full-name"></h1>
                    <p class="user__bio-text"></p>
                </div>
            </div>
        </header>

        <!-- user Content Section -->
        <div class="user__profile-content">
            <div class="user__content-nav">
                <div class="user__posts active">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/profile/post_grid.svg') ?> POSTS
                </div>

            </div>

            <div class="user__content-container">
                <div class="user__profile-posts active">
                    
                </div>

                <div class="user__profile-saved">
                    <div class="user__no-saved">
                        <div class="user__camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        
                        <h2>Start Saving</h2>
                    </div>
                </div>


                <div class="user__profile-tagged">
                    <div class="user__no-tagged">
                        <div class="user__camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>Photos of you</h2>
                    </div>
                </div>

            </div>
        </div>
    </div>




    <!-- Setting post overlay -->
    <div class="user__setting-overlay" style="display:none;">
        <div class="user__setting-option-card">
            <a href="logout.php" class="user__item-logout">Log out</a>
            <a class="user__item-cancel">Cancel</a>
        </div>
    </div>


    <!-- Followers -->
    <div class="user__followers-overlay" style="display:none;">
        <div class="user__followers">
            <div class="user__followers-header">
                <h3>Followers</h3>
                <a class="user__followers-close-btn" onclick="closeUserPostPopup()"><i class="fas fa-times"></i></a>
            </div>
            <div class="user__list-followers">
                <div class="user__followers-item">
                    <div class="user__followers-pic"></div>
                    <div class="user__followers-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
                <div class="user__followers-item">
                    <div class="user__followers-pic"></div>
                    <div class="user__followers-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Following -->
    <div class="user__following-overlay" style="display:none;">
        <div class="user__following">
            <div class="user__following-header">
                <h3>Following</h3>
                <a class="user__following-close-btn" onclick="closePopup()"><i class="fas fa-times"></i></a>
            </div>
            <div class="user__list-following">
                <div class="user__following-item">
                    <div class="user__following-pic"></div>
                    <div class="user__following-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>                
            </div>
        </div>
    </div>

    

    

    <!-- Popup -->
    <div class="global__popup" id="imagePopup" postId="" onclick="closePopup('user')">
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
<script src="js/user.js"></script>
<script src="js/post_popup.js"></script>