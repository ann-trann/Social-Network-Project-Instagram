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


<main class="user__main-content-profile"> 
    <div class="user__profile-container">
        <!-- user Header Section -->
        <header class="user__profile-header">
            <div class="user__profile-picture">
                <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="Profile Picture">
            </div>
            
            <div class="user__profile-info">
                <div class="user__profile-title">
                    <h2 class="user__username">username</h2>
                    <button class="user__following-btn">Following</button>
                    <button class="user__message-btn">Message</button>
                </div>
                
                <div class="user__profile-stats">
                    <span><strong>0</strong> posts</span>
                    <span class="user__followers-stats"><strong>0</strong> followers</span>
                    <span class="user__following-stats"><strong>0</strong> following</span>
                </div>
                
                <div class="user__profile-bio">
                    <h1 class="user__full-name">Full Name</h1>
                    <p class="user__bio-text">Bio goes here...</p>
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
                    <!-- <div class="user__no-posts">
                        <div class="user__camera-icon">
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
                        <div class="explore__grid-item" onclick="showPopup('https://picsum.photos/300/300?random=6', 'User 6', 'Third user post caption')">
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
                <a class="user__followers-close-btn" onclick="closePopup()"><i class="fas fa-times"></i></a>
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

    
</main>


<script src="js/common.js"></script>  <!-- Thêm dòng này -->
<script src="js/user.js"></script>