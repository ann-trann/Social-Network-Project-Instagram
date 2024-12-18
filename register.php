<?php
require_once "core/init.php";
require "shared/sidebar.php";
?>

<section class="pageContainer">
    <main class="row">
        <div class="col-1">
            <div class="heroImg">
            </div>
        </div>
        <article class="col-2">
            
            <form action="" class="form">
                <div class="siteLogoContainer">
                    <img src="<?= url_for('assets/images/logo/instagram.png'); ?>" alt="Instagram Logo">
                </div>

                <input type="email" placeholder="Email" class="form--input" name="email" autocomplete="off">

                <div class="passwordContainer">
                    <input type="password" placeholder="Password" class="form--input" name="password" id="password" autocomplete="new-password">
                    <span class="show_hide_text cursor-pointer" id="show_hide_password">Show</span>
                </div>

                <input type="text" placeholder="Full Name" class="form--input" name="full_name" autocomplete="off">

                <input type="text" placeholder="Username" class="form--input" name="username" autocomplete="off">

                <button class="button cursor-pointer" type="submit" name="submitButton">Register</button>
                <span class="separator">Or</span>
                <span style="font-size: 14px;">By signing up, you agree to our 
                    <a href="https://help.instagram.com/581066165581870" style="font-weight: bold; color: black;">Terms</a>, 
                    <a href="https://www.facebook.com/privacy/policy" style="font-weight: bold; color: black;">Privacy Policy</a> and 
                    <a href="https://privacycenter.instagram.com/policies/cookies/" style="font-weight: bold; color: black;">Cookies Policy</a>.
                </span>

            </form>
            <footer class="form--footer">
                Have an account? <a href="login.php">Log In</a>
            </footer>
        </article>
    </main>
</section>
<script src="js/common.js"></script>
<script src="js/register_handler.js"></script>
</body>

</html>