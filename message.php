<?php
require_once "core/init.php";

$page = 'message';

// Kiểm tra đăng nhập
if (!loggedIn()) {
    Redirect::to('login');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>

<main class="main-content-messages">
</main>

<script src="js/common.js"></script>
<script src="js/message.js"></script>