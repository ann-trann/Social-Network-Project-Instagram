<?php 
if (!defined('SHARED_PATH')) {
    define('SHARED_PATH', dirname(__FILE__));
}
?>

<nav class="sidebar-small">
    <div class="logo-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/logo_camera.svg') ?>
    </div>

    <!-- Home Small Button -->
    <a href="<?php echo url_for('home'); ?>" class="nav-item-small <?php echo ($page === 'home') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'home') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home.svg');
        }
        ?>
        <!-- <span>Home</span> -->
    </a>
    
    
    <!-- Search Small Button -->
    <a class="nav-item-small" id="search-btn-small">
        <div class="search-icon-default-small">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
        </div>
        <div class="search-icon-active-small">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search_active.svg') ?>
        </div>
    </a>


    <!-- Explore Small Button -->
    <a href="<?php echo url_for('explore'); ?>" class="nav-item-small <?php echo ($page === 'explore') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'explore') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore.svg');
        }
        ?>
        <!-- <span>Explore</span> -->
    </a>


    <!-- Message Small Button -->
    <a href="<?php echo url_for('message'); ?>" class="nav-item-small <?php echo ($page === 'message') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'message') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg');
        }
        ?>
    </a>


    <!-- Notification Small Button -->
    <a class="nav-item-small" id="notification-btn-small">
        <div class="notification-icon-default-small">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
        </div>
        <div class="notification-icon-active-small">
            <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications_active.svg') ?>
        </div>
    </a>


    <!-- Create Small Button -->
    <a data-nav="create" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
    </a>


    <!-- Profile Small Button -->
    <a href="<?php echo url_for('profile'); ?>" class="nav-item <?php echo ($page === 'profile') ? 'active' : ''; ?>" id="profile-btn-small">
        <img src="">
        <!-- <span>Profile</span> -->
    </a>



    <!-- More Small Button -->
    <div class="bottom-nav-items-small">
        <a class="nav-item-small" id="more-btn-small">
            <div class="more-icon-default-small">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more.svg') ?>
            </div>
            <div class="more-icon-active-small">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more_active.svg') ?>
            </div>
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