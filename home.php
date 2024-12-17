<?php
require_once "core/init.php";
$page = 'home';
require "shared/sidebar.php";
require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>


<main class="home__main-content-home">
    <div class="home__left-sidebar"></div>
    
    <div class="home__feed-container">
        <!-- Stories section -->
        <div class="home__stories-container">
            <!-- Story items will be here -->
        </div>

        <!-- Posts feed -->
        <div class="home__posts-container">
            
        </div>
                
    </div>

    <!-- Right sidebar -->
    <div class="home__right-sidebar">
        <!-- User profile preview -->
        <div class="home__user-preview">
            <img src="<?php echo url_for('/assets/images/profileImage/default-user.png'); ?>" alt="Profile">
            <div class="home__user-info">
                <h4>Username</h4>
                <p>Full Name</p>
            </div>
            <a href="#" class="home__switch-btn">Switch</a>
        </div>

        <!-- Suggestions -->
        <div class="home__suggestions">
            <div class="home__suggestions-header">
                <h4>Suggestions For You</h4>
                <a href="#">See All</a>
            </div>
            
            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user1</a>
                        <div class="home__suggestion-text">Followed by user2 + 3 more</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user3</a>
                        <div class="home__suggestion-text">Follows you</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

            <div class="home__suggestion-item">
                <div class="home__suggestion-profile">
                    <div class="home__suggestion-pic"></div>
                    <div class="home__suggestion-info">
                        <a href="#" class="home__suggestion-username">user4</a>
                        <div class="home__suggestion-text">Suggested for you</div>
                    </div>
                </div>
                <div class="home__follow-button">Follow</div>
            </div>

        </div>
    </div>



    
    <!-- Popup -->
    <div class="profile__popup" id="imagePopup" onclick="closePopup()">
        <span class="profile__popup-close">&times;</span>
        <div class="profile__popup-content" onclick="event.stopPropagation()">
            <div class="profile__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="profile__popup-details">
                <div class="profile__details-header">
                    <div class="profile__user-pic"></div>
                    <div class="profile__user-name">John Doe</div>
                </div>

                <div class="profile__details-comment">
                    <div class="profile__post-caption">
                        <div class="profile__user-pic"></div>
                        <div class="profile__user-name-caption">
                            <div class="profile__user-name">John Doe</div>
                            <div class="profile__user-caption">Another commission completed! I made a lot of strawberry granny squares and piece them together into bag. I’m so obsessed with the strawberry lining which you can check it out on my recent reel 🍓. This bag is perfect for casual outfits and for outings 🥺✨.</div>
                        </div>
                    </div>

                    <div class="profile__post-comment">
                        <div class="profile__user-pic"></div>
                        <div class="profile__user-name-caption">
                            <div class="profile__user-name">Petticoat </div>
                            <div class="profile__user-comment">Hello hihihi Ngày xưa mình cũng có nhận một lớp nice thế và đến giờ mình vẫn siêu nhớ bé</div>
                        </div>
                    </div>

                    <div class="profile__post-comment">
                        <div class="profile__user-pic"></div>
                        <div class="profile__user-name-caption">
                            <div class="profile__user-name">Ariana Grande</div>
                            <div class="profile__user-comment">Ariana Grande’s Glinda Bubble Dress lives in my head rent free, can’t wait to finish the cosplay before the Wicked movie comes out</div>
                        </div>
                    </div>
                </div>

                <div class="profile__details-action">
                    <div class="profile__details-action-icons">
                        <a class="profile__like-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                        </a>
                        <a class="profile__comment-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                        </a>
                        <a class="profile__share-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/share.svg') ?>
                        </a>

                    </div>
                    <a class="profile__save-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/save.svg') ?>
                    </a>
                </div>
                
                <div class="profile__like-count">2,171 likes</div>
                <div class="profile__details-add-comment">
                    <span class="profile__smile-icon">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/message_svg/smile_icon.svg') ?>
                    </span>
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
            
        </div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/home.js"></script>
