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
    <a href="#" class="nav-item-small" id="search-btn-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
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
    <a href="#" class="nav-item-small <?php echo ($page === 'message') ? 'active' : ''; ?>">
        <?php 
        if ($page === 'message') {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages_active.svg');
        } else {
            include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg');
        }
        ?>
    </a>


    <!-- Notification Small Button -->
    <a href="#" class="nav-item-small" id="notification-btn-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
    </a>


    <!-- Create Small Button -->
    <a href="#" data-nav="create" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
    </a>


    <!-- Profile Small Button -->
    <a href="<?php echo url_for('profile'); ?>" class="nav-item <?php echo ($page === 'profile') ? 'active' : ''; ?>">
        <?php if ($page === 'profile'): ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php else: ?>
            <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
        <?php endif; ?>
        <!-- <span>Profile</span> -->
    </a>



    <!-- More Small Button -->
    <div class="bottom-nav-items-small">
        <a class="nav-item-small" id="more-btn-small">
            <span class="more-icon-default-small">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more.svg') ?>
            </span>
            <span class="more-icon-active-small">
                <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/more_active.svg') ?>
            </span>
        </a>
    </div>


    <!-- More dropdown -->
    <?php include(SHARED_PATH . '/more_dropdown.php'); ?>
    
    <!-- Create post modal -->
    <?php include(SHARED_PATH . '/create_post_modal.php'); ?>


</nav>