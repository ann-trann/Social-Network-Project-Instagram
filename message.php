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
                <div class="message__username">username</div>
                <!-- <div class="message__new-message">New message</div> -->
                <div class="message__new-message">
                    <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/new_message.svg') ?>
                </div>
            </div>

            <div class="message__chat-list">
                <!-- <div class="message__chat-item" id="john-doe">
                    <div class="message__item-profile-pic"></div>
                    <div class="message__chat-info">
                        <div class="message__item-chat-name">John Doe</div>
                        <div class="message__last-message-container">
                            <div class="message__last-message">Hey, how are you?</div>
                            <div class="message__last-message-divider">•</div>
                            <div class="message__last-message-timeDifference">2h</div>
                        </div>
                    </div>
                </div>

                <div class="message__chat-item" id="jane-smith">
                    <div class="message__item-profile-pic"></div>
                    <div class="message__chat-info">
                        <div class="message__item-chat-name">Jane Smith</div>
                        <div class="message__last-message-container">
                            <div class="message__last-message">See you tomorrow!</div>
                            <div class="message__last-message-divider">•</div>
                            <div class="message__last-message-time">1d</div>
                        </div>
                    </div>
                </div> -->

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

            <div class="message__chat-content message__chat-content-john-doe hidden">
                <div class="message__chat-header">
                    <div class="message__profile-pic"></div>
                    <div class="message__chat-name">John Doe</div>
                </div>

                <div class="message__chat-messages">
                    <div class="message__messages-container">
                        <div class="message__message message__sent">
                            <div class="message__message-content">Sure, sounds good!</div>
                        </div>
                        <div class="message__message message__received">
                            <div class="message__message-content">Doing great! Want to catch up later?</div>
                        </div>
                        <div class="message__message message__sent">
                            <div class="message__message-content">I'm good, thanks! How about you?</div>
                        </div>
                        <div class="message__message message__received">
                            <div class="message__message-content">Hey, how are you?</div>
                        </div>
                    </div>

                </div>

                <div class="message__chat-input">
                    <span class="message__smile-icon">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/smile_icon.svg') ?>
                    </span>

                    <input type="text" class="message__input-box" placeholder="Message...">

                    <div class="message__input-actions">
                        <span class="message__image-icon">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/image.svg') ?>
                        </span>

                        <span class="message__like-icon">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/like.svg') ?>
                        </span>

                        <button class="message__send-button hidden">Send</button>
                    </div>
                </div>
            </div>


        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/message.js"></script>