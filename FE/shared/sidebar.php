<?php 
if(!isset($title)){$title = "Instagram";
    $keywords = "Instagram, Share and capture world's moments, share, capture, share,home";
}
$desc = "Instagram lets you capture, follow, like and share world's moments in a better way and tell your story with photos, messages, posts and everything in between";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Comatiple" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title; ?></title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <meta name="keywords" content="<?= $keywords;?>">
    <meta name="description" content="<? $desc; ?>">
    <meta name="author" content="WuKong">

    <link rel="shortcut icon" href="<?= url_for('assets/images/favicon/instagram.ico'); ?>" type="image/x-icon">
    <link rel="stylesheet" href="<?= url_for('css/master.css'); ?>">
    <script src="<?= url_for('js/more_dropdown.js'); ?>" defer></script>
    <script src="<?= url_for('js/create_post.js'); ?>" defer></script>
    <script src="<?= url_for('js/search_sidebar.js'); ?>" defer></script>
    <script src="<?= url_for('js/notification_sidebar.js'); ?>" defer></script>
</head>
<body>
    