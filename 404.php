<?php
require_once "core/init.php";

$title = "Page Not Found • Instagram";
$keywords = "error, 404, document not found, webpage not found, Instagram, Share and capture world's moments";

require "shared/header.php";
?>

<header class="error--header">
    <nav class="error--header-content">
        <div class="error--header-left">
            <a href="<?php echo url_for('home.php'); ?>" class="header__home-error">
                <img src="<?php echo url_for('assets/images/logo/instagram.png'); ?>" alt="Site Logo">
            </a>
        </div>
        <div class="error--header-right">
            <?php if(loggedIn()) { ?>
                <a href="<?php echo url_for('profile'); ?>" class="profile_button">
                    Profile Page
                </a>
                <a href="<?php echo url_for('home.php'); ?>" class="error--link">


                    Try Going to Home Page
                </a>
            <?php } else { ?>
                <a href="login" class="error--link">
                    <!-- 
                    < ?php echo url_for('login') ?>
                    trong href
                    -->

                    Log In
                </a>
                <a href="register" class="error--link">
                    <!-- 
                    < ?php echo url_for('register') ?>
                    trong href
                    -->
                    Register
                </a>
                     
            <?php } ?>
        </div>
    </nav>
</header>
<div class="error--container">
    <div class="error-content">
        <h1>Sorry this page isn't available</h1>
        <p>The link you followed may be broken, or the page may have been removed.<a href="<?php echo url_for('home.php'); ?>">Go back to Instagram</a></p>
        <img src="<?php echo url_for('assets/images/logo/404.png'); ?>" alt="404">
    </div>
</div>