<?php
require_once "core/init.php"; 
$title = "Profile • Instagram";
$keywords = "Instagram profile, user profile, Instagram";

$page = 'profile';

// Đảm bảo user đã đăng nhập
if (!isset($_SESSION['user_id'])) {
    redirect_to(url_for('index'));
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
                <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="Profile Picture">
            </div>
            
            <div class="profile__profile-info">
                <div class="profile__profile-title">
                    <h2 class="profile__username">username</h2>
                    <button class="profile__edit-profile-btn" onclick="window.location.href='<?php echo url_for('/setting'); ?>'">Edit profile</button>
                    
                    <a class="profile__settings-option-btn">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/setting_option.svg') ?>
                    </a>
                </div>
                
                <div class="profile__profile-stats">
                    <span><strong>0</strong> posts</span>
                    <span><strong>0</strong> followers</span>
                    <span><strong>0</strong> following</span>
                </div>
                
                <div class="profile__profile-bio">
                    <h1 class="profile__full-name">Full Name</h1>
                    <p class="profile__bio-text">Bio goes here...</p>
                </div>
            </div>
        </header>

        <!-- Profile Content Section -->
        <div class="profile__profile-content">
            <div class="profile__content-nav">
                <a class="profile__posts active">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/profile/post_grid.svg') ?> POSTS
                </a>
                <a class="profile__saved">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/profile/save.svg') ?> SAVED
                </a>
                <a class="profile__tagged">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/profile/tag.svg') ?> TAGGED
                </a>

            </div>

            <div class="profile__content-container">
                <div class="profile__profile-posts active">
                    <!-- <div class="profile__no-posts">
                        <div class="profile__camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>No Posts Yet</h2>
                    </div> -->
                    
                    <div class="explore__explore-grid"> <!-- Reusing the explore grid class for consistency -->
                        <!-- Profile Grid Item 1 -->
                        <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=4', 'User 4', 'First profile post caption')">
                            <img src="https://picsum.photos/300/300?random=4" alt="Profile Post 1">
                            <div class="explore__overlay">
                                <div class="explore__overlay-stats">
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                                        <span>876</span>
                                    </div>
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                                        <span>145</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Profile Grid Item 2 -->
                        <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=5', 'User 5', 'Second profile post caption')">
                            <img src="https://picsum.photos/300/300?random=5" alt="Profile Post 2">
                            <div class="explore__overlay">
                                <div class="explore__overlay-stats">
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                                        <span>654</span>
                                    </div>
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                                        <span>98</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Profile Grid Item 3 -->
                        <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=6', 'User 6', 'Third profile post caption')">
                            <img src="https://picsum.photos/300/300?random=6" alt="Profile Post 3">
                            <div class="explore__overlay">
                                <div class="explore__overlay-stats">
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                                        <span>432</span>
                                    </div>
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                                        <span>76</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Profile Grid Item 4 -->
                        <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=7', 'User 7', 'Fourth profile post caption')">
                            <img src="https://picsum.photos/300/300?random=7" alt="Profile Post 4">
                            <div class="explore__overlay">
                                <div class="explore__overlay-stats">
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                                        <span>321</span>
                                    </div>
                                    <div class="explore__stat-item">
                                        <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                                        <span>54</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile__profile-saved">
                    <div class="profile__no-saved">
                        <div class="profile__camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>Start Saving</h2>
                    </div>
                </div>


                <div class="profile__profile-tagged">
                    <div class="profile__no-tagged">
                        <div class="profile__camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>Photos of you</h2>
                    </div>
                </div>

            </div>
        </div>
    </div>




    <!-- Discard post overlay -->
    <div class="profile__setting-overlay" style="display:none;">
        <div class="profile__setting-option-card">
            <a href="logout.php" class="profile__item-logout">Log out</a>
            <a class="profile__item-cancel">Cancel</a>
        </div>
    </div>


    <!-- Followers -->
    <!-- <div class="profile__followers-overlay" style="display:none;">
        <div class="profile__follower">
            <h3>Followers</h3>
            <div class="profile__list-followers">
                <div class="profile__follower-item">
                    <div class="profile__follower-pic"></div>
                    <div class="profile__follower-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>
            </div>
        </div>
    </div> -->


    <!-- Following -->
    <!-- <div class="profile__following-overlay" style="display:none;">
        <div class="profile__following">
            <h3>Following</h3>
            <div class="profile__list-following">
                <div class="profile__follower-item">
                    <div class="profile__following-pic"></div>
                    <div class="profile__following-info">
                        <h4>username</h4>
                        <p>Full Name</p>
                    </div>
                </div>                
            </div>
        </div>
    </div> -->

    
</main>


<script src="js/common.js"></script>  <!-- Thêm dòng này -->
<script src="js/profile.js"></script>