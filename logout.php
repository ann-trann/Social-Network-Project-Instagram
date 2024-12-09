<?php
    require_once 'core/init.php';

    // Destroy the session
    session_start();
    session_unset();     // Unset all session variables
    session_destroy();   // Destroy the session

    // Redirect to login page
    header('Location: login');
    exit();
?>