<?php
require_once "core/init.php";

$page = 'message';

// Kiểm tra đăng nhập trước khi cho phép truy cập trang home
if (!loggedIn()) {
    Redirect::to('login');
    exit();
}

$user_id = $_SESSION['user_id'];
require "shared/sidebar.php";
?>

<link rel="stylesheet" href="css/origin-form.css">


<div class="nav-content">
    <div class="nav-origin-container">
        <div class="asdasdasd"></div>
        <?php require_once "shared/global.sidebar.php"; ?>
        <?php require_once "shared/global.sidebar_small.php"; ?>
    </div>

    <div class="nav-body-container">
        <div class="body-container">
            <!-- Message Bar -->
            <div class="message-bar">
            <div class="message-bar-header">
                <!-- Phần chứa tên người dùng -->
                <div class="user-info">
                    <span class="user-name">username</span>
                    <span class="user-dropdown">&#9660;</span> <!-- Biểu tượng mũi tên dropdown -->
                    <button class="new-message-btn">
                    <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\pen-square.svg') ?>
                    </button>
                </div>
                <!-- Phần avatar và ghi chú -->
                <div class="user-avatar-container">
                    <div class="note-bubble">
                        <span class="note-text">Note...</span>
                    </div>
                    <img src="assets/images/profileImage/default-user.png" alt="User Avatar" class="user-avatar">
                    <span class="user-note">Your note</span>
                </div>
                
                <!-- Nút tạo tin nhắn -->
                <div class="message-requests">
                    <h3>Message</h3>
                <button class="request-btn">Requests</button>
                </div>
            </div>

                
            <ul class="message-list">
                <!-- Example Item -->
                <li class="message-item">
                <img src="assets/images/profileImage/user1.png" alt="User Avatar" class="avatar">
                <div class="message-info">
                    <span class="user-name">John Doe</span>
                    <span class="latest-message">Hey, how are you?</span>
                </div>
                </li>
                <!-- Repeat for more users -->
            </ul>
            </div>

            <!-- Message Container -->
            <div class="message-container">
                <div class="message-header">
                <img src="assets/images/profileImage/user2.png" alt="Chat Avatar" class="chat-avatar">
                <span class="chat-user-name">Jane Doe</span>
                <button class="conversation-info-btn">
                <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\info.svg') ?>
                </button>
                </div>
                <div class="message-history">
                <!-- Example chat messages -->
                <div class="message message-received">
                    <p>Hi! How are you?</p>
                    <span class="timestamp">10:30 AM</span>
                </div>
                <div class="message message-sent">
                    <p>I'm good, thanks! And you?</p>
                    <span class="timestamp">10:32 AM</span>
                </div>
                </div>
                <div class="message-input">
                <button class="emote-btn">
                <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\smile.svg') ?>
                </button>
                <input type="text" placeholder="Message" class="message-field">
                <button class="send-btn">Send</button>
                </div>
            </div>
            </div>

            <!-- Account Switch Popup -->
            <div id="account-switch-popup" class="popup hidden">
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h3>Switch accounts</h3>
                <ul class="account-list">
                <li>
                    <img src="assets/images/profileImage/default-user.png" alt="User Avatar" class="account-avatar">
                    <span>cong0_601</span>
                    <span class="check-mark">&#10003;</span>
                </li>
                </ul>
                <div>
                <a href="#" class="login-existing">Log into an Existing Account</a>
                </div>
            </div>
            </div>

            <div id="message-popup" class="popup hidden">
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h3>New message</h3>
                <form>
                <label for="search">To:</label>
                <input type="text" id="search" placeholder="Search...">
                <p>No account found.</p>
                <button type="submit" class="chat-btn" disabled>Chat</button>
                </form>
            </div>
        </div>
    </div>
</div>




  

<link rel="stylesheet" href="css/message.css">
<script src="js/common.js"></script>
<script src="js/message.js"></script>