<?php 
if (!defined('SHARED_PATH')) {
    define('SHARED_PATH', dirname(__FILE__));
}
?>

<nav class="sidebar">
    <div class="logo">
        <div class="small-icon-insta">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/Instagram.svg') ?>
        </div>
        <div class="small-logo-insta">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/logo.svg') ?>
        </div>
        
    </div>

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
    
    <a class="nav-item" id="search-btn">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
        <span>Search</span>
    </a>

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

    <a href="<?php echo url_for('message'); ?>" class="nav-item <?php echo ($page === 'message') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'message') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg');
        }
        ?>
        <span>Messages</span>
    </a>

    <a class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
        <span>Notifications</span>
    </a>
    
    <a data-nav="create" class="nav-item">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
        <span>Create</span>
    </a>

    <a href="<?php echo url_for('profile'); ?>" class="nav-item <?php echo ($page === 'profile') ? 'active' : ''; ?>">
        <?php if ($page === 'profile'): ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php else: ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php endif; ?>
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

    <!-- Search sidebar -->
    <?php include(SHARED_PATH . '/search_sidebar.php'); ?>  

    <!-- Notification sidebar -->
    <?php include(SHARED_PATH . '/notification_sidebar.php'); ?>

    <!-- More dropdown -->
    <?php include(SHARED_PATH . '/more_dropdown.php'); ?>
    
    <!-- Create post modal -->
    <?php include(SHARED_PATH . '/modals/create_post_modal.php'); ?>


</nav>