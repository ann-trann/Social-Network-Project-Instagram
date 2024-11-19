<?php
require_once "core/init.php";

// Kiểm tra đăng nhập trước khi cho phép truy cập trang home
if (!loggedIn()) {
    Redirect::to('login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<script src="js/common.js"></script>