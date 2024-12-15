<?php 
if (!defined('SHARED_PATH')) {
    define('SHARED_PATH', dirname(__FILE__));
}
?>

<nav class="sidebar">
    <div class="logo">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/logo.svg') ?>
    </div>


    <!-- Home Button -->
    <a href="<?php echo url_for('home'); ?>" class="nav-item <?php echo ($page === 'home') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'home') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home.svg');
        }
        ?>
        <span>Home</span>
    </a>
    
    
    <!-- Search Button -->
    <a class="nav-item" id="search-btn">
        <div class="search-icon-default">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
        </div>
        <div class="search-icon-active">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search_active.svg') ?>
        </div>
        <span>Search</span>
    </a>
    


    <!-- Explore Button -->
    <a href="<?php echo url_for('explore'); ?>" class="nav-item <?php echo ($page === 'explore') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'explore') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore.svg');
        }
        ?>
        <span>Explore</span>
    </a>


    <!-- Message Button -->
    <a href="<?php echo url_for('message'); ?>" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg'); ?>
        <span>Messages</span>
    </a>


    <!-- Notification Button -->
    <a class="nav-item" id="notification-btn">
        <div class="notification-icon-default">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
        </div>
        <div class="notification-icon-active">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications_active.svg') ?>
        </div>
        <span>Notifications</span>
    </a>
    

    <!-- Create Button -->
    <a data-nav="create" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
        <span>Create</span>
    </a>


    <!-- Profile Button -->
    <a href="<?php echo url_for('profile'); ?>" class="nav-item <?php echo ($page === 'profile') ? 'active' : ''; ?>">
        <?php if ($page === 'profile'): ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php else: ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php endif; ?>
        <span>Profile</span>
    </a>


    <!-- More Button -->
    <div class="bottom-nav-items">
        <a class="nav-item" id="more-btn">
            <div class="more-icon-default">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more.svg') ?>
            </div>
            <div class="more-icon-active">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more_active.svg') ?>
            </div>
            <span>More</span>
        </a>
    </div>


    
    <!-- Search sidebar -->
    <?php include(SHARED_PATH . '/search_sidebar.php'); ?>  

    <!-- Notification sidebar -->
    <?php include(SHARED_PATH . '/notification_sidebar.php'); ?>

    <!-- More dropdown -->
    <?php include(SHARED_PATH . '/more_dropdown.php'); ?>
    
    <!-- Create post modal -->
    <?php include(SHARED_PATH . '/create_post_modal.php'); ?>


</nav>