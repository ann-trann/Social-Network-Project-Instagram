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

<main class="messages__main-content-messages">
    <div class="messages__body-container">
        <!-- Message Bar -->
        <div class="messages__message-bar">
            <div class="messages__message-bar-header">
                <!-- Phần chứa tên người dùng -->
                <div class="messages__user-info">
                    <span class="messages__user-name">username</span>
                    <span class="messages__user-dropdown">&#9660;</span> <!-- Biểu tượng mũi tên dropdown -->
                    <button class="messages__new-message-btn">
                        <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\pen-square.svg') ?>
                    </button>
                </div>
                <!-- Phần avatar và ghi chú -->
                <div class="messages__user-avatar-container">
                    <div class="messages__note-bubble">
                        <span class="messages__note-text">Note...</span>
                    </div>
                    <img src="assets/images/profileImage/default-user.png" alt="User Avatar" class="messages__user-avatar">
                    <span class="messages__user-note">Your note</span>
                </div>

                <!-- Nút tạo tin nhắn -->
                <div class="messages__message-requests">
                    <h3>Message</h3>
                    <button class="messages__request-btn">Requests</button>
                </div>
            </div>


            <ul class="messages__message-list">
                <!-- Example Item -->
                <li class="messages__message-item">
                    <img src="assets/images/profileImage/user1.png" alt="User Avatar" class="messages__avatar">
                    <div class="messages__message-info">
                        <span class="messages__user-name">John Doe</span>
                        <span class="messages__latest-message">Hey, how are you?</span>
                    </div>
                </li>
                <!-- Repeat for more users -->
            </ul>
        </div>

        <!-- Message Container -->
        <div class="messages__message-container">
            <div class="messages__message-header">
                <img src="assets/images/profileImage/user2.png" alt="Chat Avatar" class="messages__chat-avatar">
                <span class="messages__chat-user-name">Jane Doe</span>
                <button class="messages__conversation-info-btn">
                    <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\info.svg') ?>
                </button>
            </div>
            <div class="messages__message-history">
                <!-- Example chat messages -->
                <div class="messages__message message-received">
                    <p>Hi! How are you?</p>
                    <span class="messages__timestamp">10:30 AM</span>
                </div>
                <div class="messages__message message__message-sent">
                    <p>I'm good, thanks! And you?</p>
                    <span class="messages__timestamp">10:32 AM</span>
                </div>
            </div>
            <div class="messages__message-input">
                <button class="messages__emote-btn">
                    <?php include(dirname(SHARED_PATH) . '\assets\svg\message_svg\smile.svg') ?>
                </button>
                <input type="text" placeholder="Message" class="messages__message-field">
                <button class="messages__send-btn">Send</button>
            </div>
        </div>
    </div>

    <!-- Account Switch Popup -->
    <div id="account-switch-popup" class="messages__popup hidden">
        <div class="messages__popup-content">
            <span class="messages__close-btn">&times;</span>
            <h3>Switch accounts</h3>
            <ul class="messages__account-list">
                <li>
                    <img src="assets/images/profileImage/default-user.png" alt="User Avatar" class="messages__account-avatar">
                    <span>cong0_601</span>
                    <span class="messages__check-mark">&#10003;</span>
                </li>
            </ul>
            <div>
                <a href="#" class="messages__login-existing">Log into an Existing Account</a>
            </div>
        </div>
    </div>

    <div id="message-popup" class="messages__popup hidden">
        <div class="messages__popup-content">
            <span class="messages__close-btn">&times;</span>
            <h3>New message</h3>
            <form>
                <label for="search">To:</label>
                <input type="text" id="search" placeholder="Search...">
                <p>No account found.</p>
                <button type="submit" class="messages__chat-btn" disabled>Chat</button>
            </form>
        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/message.js"></script>