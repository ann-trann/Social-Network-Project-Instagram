<?php
require_once "core/init.php";
require_once "shared/sidebar.php";
?>

<section class="pageContainer">
    <main class="row">
        <div class="col-1">
            <div class="heroImg">
            </div>
        </div>

        <article class="col-2">
            <form action="">
                <div class="siteLogoContainer">
                    <img src="<?= url_for('assets/images/logo/instagram.png'); ?>" alt="">
                </div>

                <input type="text" placeholder="Email" class="form--input" name="email">

                <div class="passwordContainer">
                    <input type="password" placeholder="Password" class="form--input" name="password" id="password">
                    <span class="show_hide_text cursor-pointer" id="show_hide_password">Show</span>
                </div>

                <button class="button cursor-pointer" type="submit" name="submitButton">Log In</button>

                <span class="separator">Or</span>

                <a href="#" class="password_reset">Forgot Password</a>
            </form>

            <footer class="form--footer">
                Don't have an account? <a href="register">Sign Up</a>
            </footer>
        </article>
    </main>
</section>

<script src="js/common.js"></script>
<script src="js/login_handler.js"></script>
</body>

</html>