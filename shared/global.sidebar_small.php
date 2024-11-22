<?php 
if (!defined('SHARED_PATH')) {
    define('SHARED_PATH', dirname(__FILE__));
}
?>

<nav class="sidebar-small">
    <div class="logo-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/logo_camera.svg') ?>
    </div>

    <a href="#" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/home.svg') ?>
    </a>
    
    <a href="#" class="nav-item-small" id="search-btn-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/search.svg') ?>
    </a>

    <a href="#" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/explore.svg') ?>
    </a>

    <a href="#" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/messages.svg') ?>
    </a>

    <a href="#" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/notifications.svg') ?>
    </a>

    <a href="#" data-nav="create" class="nav-item-small">
        <?php include(dirname(SHARED_PATH) . '/assets/svg/sidebar/create.svg') ?>
    </a>

    <a href="profile" class="nav-item-small">
        <img src="<?php echo url_for("/assets/images/profileImage/default-user.png"); ?>" alt="">
    </a>


    <div class="bottom-nav-items-small">
        <a href="#" class="nav-item-small" id="more-btn-small">
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
    <?php include(SHARED_PATH . '/modals/create_post_modal.php'); ?>


</nav>