<?php
require_once "core/init.php";

$page = 'setting';

require_once 'auth.php';

if (!checkToken()) {
    // Token không hợp lệ hoặc không tồn tại, chuyển hướng về login
    header('Location: login');
    exit();
}

require "shared/sidebar.php";
?>

<?php require_once "shared/global.sidebar.php"; ?>
<?php require_once "shared/global.sidebar_small.php"; ?>
<link rel="stylesheet" href="./css/spinner.css">

<main class="setting__main-content-setting">
    <div class="setting__setting-container">
    <h1 class="setting__title">Edit Profile</h1>
        
        <div class="setting__profile-section">
                <div class="setting__profile-picture">
                <div class="avatar-container">
                    <img src="" alt="Profile Picture">
                    <div class="avatar-overlay">
                        <input type="file" id="avatar-upload" accept="image/*">
                        <label for="avatar-upload" class="setting__change-photo-btn">Change Photo</label>
                    </div>
                </div>
                <button type="button" id="remove-photo" class="setting__remove-photo-btn">Remove Current Photo</button>
            </div>

            <form class="setting__form">
                <div class="setting__form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="Name" value="">
                    <span class="setting__help-text">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</span>
                </div>

                <div class="setting__form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Username" value="">
                    <span class="setting__help-text">In most cases, you'll be able to change your username back to example for another 14 days.</span>
                </div>

                <div class="setting__form-group">
                    <label for="bio">Bio</label>
                    <textarea id="bio" rows="3" placeholder="Bio"></textarea>
                    <span class="setting__characters-count">0/150</span>
                </div>

                <div class="setting__form-group">
                    <label for="gender">Gender</label>
                    <div class="setting__select-wrapper">
                        <select id="gender" name="gender" class="setting__select">
                            <option value="" disabled selected>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer Not to Say</option>
                        </select>
                        <div class="setting__select-arrow"></div>
                    </div>
                    <span class="setting__help-text">This won’t be part of your public profile.</span>
                </div>

                <button type="submit" class="setting__submit-btn">Submit</button>
            </form>
        </div>
        
    </div>

    <div id="loading-overlay" style="display: none;">
        <div class="spinner"></div>
    </div>
</main>

<script src="js/common.js"></script>
<script src="js/setting.js"></script>