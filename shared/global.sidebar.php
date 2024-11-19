<?php 
if (!defined('SHARED_PATH')) {
    define('SHARED_PATH', dirname(__FILE__));
}
?>

<nav class="sidebar">
    <div class="logo">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/logo.svg') ?>
    </div>

    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home.svg') ?>
        <span>Home</span>
    </a>
    
    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
        <span>Search</span>
    </a>

    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore.svg') ?>
        <span>Explore</span>
    </a>
    
    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/reels.svg') ?>
        <span>Reels</span>
    </a>

    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg') ?>
        <span>Messages</span>
    </a>

    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
        <span>Notifications</span>
    </a>
    <a href="#" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
        <span>Create</span>
    </a>

    <a href="profile" class="nav-item">
        <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <span>Profile</span>
    </a>


    <div class="bottom-nav-items">
        <a href="#" class="nav-item" id="more-btn">
            <span class="more-icon-default">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more.svg') ?>
            </span>
            <span class="more-icon-active">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more_active.svg') ?>
            </span>
            <span>More</span>
        </a>
    </div>

    <div class="more-dropdown">
        <a href="#" class="dropdown-item">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/more_dropdown/setting.svg') ?>
            <span>Settings</span>
        </a>
        <a href="#" class="dropdown-item">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/more_dropdown/your_activity.svg') ?>
            <span>Your activity</span>
        </a>
        <a href="#" class="dropdown-item">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/more_dropdown/saved.svg') ?>
            <span>Saved</span>
        </a>
        <a href="#" class="dropdown-item">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/more_dropdown/appearance.svg') ?>
            <span>Switch appearance</span>
        </a>
        <a href="#" class="dropdown-item">Report a problem</a>
        <a href="#" class="dropdown-item">Switch accounts</a>
        <a href="logout.php" class="dropdown-item">Log out</a>
    </div>

</nav>