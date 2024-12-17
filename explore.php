<?php
require_once "core/init.php";

$page = 'explore';

require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}

// Kiểm tra nếu có postId được truyền vào
if (isset($_GET['postId'])) {
    $postId = $_GET['postId'];
    // Bạn có thể sử dụng $postId để load thông tin bài post cụ thể nếu cần
}

require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>

<main class="explore__main-content-explore">
    <div class="explore__explore-container">
        
        <!-- Grid layout for posts -->
        <div class="explore__explore-grid">
            
            <!-- Explore Grid Item 1 -->
            <div class="explore__grid-item" id="fdsaddgrf" onclick="showPopup('https://picsum.photos/300/300?random=1', 'User 1', 'This is caption for post 1', 'fdsaddgrf')">
                <img src="https://picsum.photos/300/300?random=1" alt="Post 1">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 2 -->
            <div class="explore__grid-item" id="fdddfthyu" onclick="showPopup('https://picsum.photos/300/400?random=2', 'User 2', 'This is caption for post 2', 'fdddfthyu')">
            <img src="https://picsum.photos/300/400?random=2" alt="Post 2">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 3 -->
            <div class="explore__grid-item" id="drtykiu" onclick="showPopup('https://picsum.photos/400/300?random=3', 'User 3', 'This is caption for post 3', 'drtykiu')">
            <img src="https://picsum.photos/400/300?random=3" alt="Post 3">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 4 -->
            <div class="explore__grid-item" id="fdssdeftr" onclick="showPopup('https://picsum.photos/300/500?random=4', 'User 4', 'This is caption for post 4', 'fdssdeftr')">
            <img src="https://picsum.photos/300/500?random=4" alt="Post 4">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explore Grid Item 5 -->
            <div class="explore__grid-item" id="wertyg" onclick="showPopup('https://picsum.photos/500/300?random=5', 'User 5', 'This is caption for post 5', 'wertyg')">
            <img src="https://picsum.photos/500/300?random=5" alt="Post 4">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

            
            <!-- Explore Grid Item 6 -->
            <div class="explore__grid-item" id="sertcvik" onclick="showPopup('https://picsum.photos/300/600?random=6', 'User 5', 'This is caption for post 5', 'sertcvik')">
            <img src="https://picsum.photos/300/600?random=6" alt="Post 4">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>


            
            <!-- Explore Grid Item 7 -->
            <div class="explore__grid-item" id="cokerjm" onclick="showPopup('https://picsum.photos/600/300?random=7', 'User 5', 'This is caption for post 5')">
            <img src="https://picsum.photos/600/300?random=7" alt="Post 4">
                <div class="explore__overlay">
                    <div class="explore__overlay-stats">
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-heart"></i></span>
                            <span>1.2K</span>
                        </div>
                        <div class="explore__stat-item">
                            <span class="explore__stat-icon"><i class="fas fa-comment"></i></span>
                            <span>234</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!-- Popup -->
    <div class="explore__popup" id="imagePopup" onclick="closePopup()">
        <span class="explore__popup-close">&times;</span>
        <div class="explore__popup-content" onclick="event.stopPropagation()">
            <div class="explore__popup-image">
                <img id="popupImg" src="" alt="Popup Image">
            </div>

            <div class="explore__popup-details">
                <div class="explore__details-header">
                    <div class="explore__user-pic"></div>
                    <div class="explore__user-name">John Doe</div>
                </div>

                <div class="explore__details-comment">
                    <div class="explore__post-caption">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name-caption">
                            <div class="explore__user-name">John Doe</div>
                            <div class="explore__user-caption">Another commission completed! I made a lot of strawberry granny squares and piece them together into bag. I’m so obsessed with the strawberry lining which you can check it out on my recent reel 🍓. This bag is perfect for casual outfits and for outings 🥺✨.</div>
                        </div>
                    </div>

                    <div class="explore__post-comment">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name-caption">
                            <div class="explore__user-name">Petticoat </div>
                            <div class="explore__user-comment">Hello hihihi Ngày xưa mình cũng có nhận một lớp nice thế và đến giờ mình vẫn siêu nhớ bé</div>
                        </div>
                    </div>

                    <div class="explore__post-comment">
                        <div class="explore__user-pic"></div>
                        <div class="explore__user-name-caption">
                            <div class="explore__user-name">Ariana Grande</div>
                            <div class="explore__user-comment">Ariana Grande’s Glinda Bubble Dress lives in my head rent free, can’t wait to finish the cosplay before the Wicked movie comes out</div>
                        </div>
                    </div>
                </div>

                <div class="explore__details-action">
                    <div class="explore__details-action-icons">
                        <a class="explore__like-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/like.svg') ?>
                        </a>
                        <a class="explore__comment-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/comment.svg') ?>
                        </a>
                        <a class="explore__share-post">
                            <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/share.svg') ?>
                        </a>

                    </div>
                    <a class="explore__save-post">
                        <?php include(dirname(SHARED_PATH) . '/assets/svg/like_share_comment/save.svg') ?>
                    </a>
                </div>
                
                <div class="explore__like-count">2,171 likes</div>
                <div class="explore__details-add-comment">
                    <span class="explore__smile-icon">
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
<script src="js/explore.js"></script>