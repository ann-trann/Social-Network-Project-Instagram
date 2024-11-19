<?php
    ob_start();
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    session_start();

    define("WW_ROOT","/Social-Network-Project-Instagram/");

    // Load các functions cần thiết
    require_once __DIR__ . "/../functions/functions_login.php";
    require_once __DIR__ . "/Input.php";
    require_once __DIR__ . "/Redirect.php";

    // require_ONCE "config.php";
    // require_ONCE "functions.php";

    // spl_autoload_register(function($className){
    //     require_once "classes/" .$className.".php";
    // });

    // $account=new Account();
?>