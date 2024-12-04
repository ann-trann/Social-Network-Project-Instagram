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
<link rel="stylesheet" href="css/origin-form.css">


<div class="nav-content">
    <div class="nav-origin-container">
        <div class="asdasdasd"></div>
        <?php require_once "shared/global.sidebar.php"; ?>
        <?php require_once "shared/global.sidebar_small.php"; ?>
    </div>

    <div class="nav-body-container">
<div class="wrapper">
    <?php include_once "shared/global.sidebar.php"; ?>
    <?php include_once "shared/global.sidebar_small.php"; ?>
    <div class="main-content-profile"> 
        <main class="profile-container">
            <!-- Profile Header Section -->
            <header class="profile-header">
                <div class="profile-picture">
                    <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="Profile Picture">
                </div>
                
                <div class="profile-info">
                    <div class="profile-title">
                        <h2 class="username">username</h2>
                        <button class="edit-profile-btn">Edit profile</button>
                        
                        <a class="settings-option-btn">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/setting_option.svg') ?>
                        </a>
                    </div>
                    
                    <div class="profile-stats">
                        <span><strong>0</strong> posts</span>
                        <span><strong>0</strong> followers</span>
                        <span><strong>0</strong> following</span>
                    </div>
                    
                    <div class="profile-bio">
                        <h1 class="full-name">Full Name</h1>
                        <p class="bio-text">Bio goes here...</p>
                    </div>
                </div>
            </header>

            <!-- Profile Content Section -->
            <div class="profile-content">
                <div class="content-nav">
                    <a href="#" class="active"><i class="fas fa-th"></i> POSTS</a>
                    <a href="#"><i class="fas fa-bookmark"></i> SAVED</a>
                    <a href="#"><i class="fas fa-id-card-alt"></i> TAGGED</a>
                </div>

                <div class="posts-grid">
                    <!-- Posts will be displayed here -->
                    <div class="no-posts">
                        <div class="camera-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <h2>No Posts Yet</h2>
                    </div>
                </div>
            </div>
        </main>
        
    </div>
</div>
    </div>

<script src="js/common.js"></script>  <!-- Thêm dòng này -->
<script src="js/profile.js"></script>