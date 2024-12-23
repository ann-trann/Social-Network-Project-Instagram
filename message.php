<?php
require_once "core/init.php";

$page = 'message';

require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}

require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar_small.php"; ?>

<main class="messages__main-content-messages">
    <div class="message__container">
        <div class="message__sidebar">
            <div class="message__sidebar-header">
                <div class="message__username"></div>
                <!-- <div class="message__new-message">New message</div> -->
                <div class="message__new-message">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/new_message.svg') ?>
                </div>
            </div>

            <div class="message__chat-list">
            </div>

        </div>

        <div class="message__chat-area">
            <!-- Initially empty chat area -->
            <div class="message__chat-empty">
                <div class="message__no-chat">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/start_chat.svg') ?>
                </div>
                <h2>Your Messages</h2>
            </div>

            <div class="message__chat-content hidden">
                <div class="message__chat-header">
                    <div class="message__profile-pic"></div>
                    <div class="message__chat-name"></div>
                    <button onclick="handleVideoCall()" class="message__video-call-btn">
                        <i class="fas fa-video"></i>
                    </button>
                </div>
                <div class="message__chat-messages">
                    <div class="message__messages-container">
                    </div>
                </div>

                <div class="message__chat-input">
                    <input class="message__input-box" placeholder="Message..."></input>
                </div>
            </div>


        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/message.js"></script>
<script src="js/socket.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.0/sockjs.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<script src="js/videoCall.js"></script>
<script src="https://cdn.socket.io/4.5.1/socket.io.min.js"></script>
