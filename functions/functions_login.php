<?php 
    function h($string = "") {
        return htmlspecialchars($string);
    }

    function url_for($script){
        $script = ltrim($script, '/');
        return WW_ROOT . $script;
    }

    function loggedIn(){
        return isset($_SESSION['user_id']);
    }

    function escape($string) {
        return htmlentities($string, ENT_QUOTES);
    }

    // Thêm vào để tránh lỗi kết nối với database, mai mốt xóa
    // Thêm hàm show_errors để tránh lỗi
    function show_errors($form_errors_array) {
        $errors = "<ul class='form_errors'>";
        foreach ($form_errors_array as $the_error) {
            $errors .= "<li>{$the_error}</li>";
        }
        $errors .= "</ul>";
        return $errors;
    }

    // Thêm hàm check_empty_fields để tránh lỗi
    function check_empty_fields($required_fields) {
        $form_errors = array();
        foreach ($required_fields as $name_of_field) {
            if (!isset($_POST[$name_of_field]) || $_POST[$name_of_field] == NULL) {
                $form_errors[] = $name_of_field . " is required.";
            }
        }
        return $form_errors;
    }

    function redirect_to($location) {
        Redirect::to($location);
    }



    // function h($string = "") {
    //     return htmlspecialchars($string);
    // }

    // function url_for($script){
    //     return WW_ROOT.$script;
    // }

    // function loggedIn(){
    //     if(isset($_SESSION['user_id'])){
    //         return true;
    //     }else{
    //         return false;
    //     }

    // }


    // function escape($string) {
    //     return htmlentities($string, ENT_QUOTES);
    // }

    // function check_empty_fields($required_fields) {
    //     $form_errors = array();
    //     foreach ($required_fields as $name_of_field) {
    //         if (!isset($_POST[$name_of_field]) || $_POST[$name_of_field] == NULL) { 
    //             $form_errors[] = $name_of_field . " is required.";
    //         }
    //     }
    //     return $form_errors;
    // }

    // function show_errors($form_errors_array) { 
    //     $errors = "<ul class='form_errors'>";
    //     foreach ($form_errors_array as $the_error) { 
    //         $errors .= "<li>{$the_error}</li>";
    //     }
    //     $errors .= "</ul>";
    //     return $errors;
    // }

    // function check_min_length($fields_to_check_length) {
    //     $form_errors = array();
    //     foreach ($fields_to_check_length as $name_of_field => $minimum_length) {
    //         // Check if the field exists in $_POST before accessing it
    //         if (isset($_POST[$name_of_field]) && strlen(trim($_POST[$name_of_field])) < $minimum_length) {
    //             $form_errors[] = $name_of_field . " is too short, must be {$minimum_length} characters long";
    //         }
    //     }
    //     return $form_errors;
    // }

    // function check_email($data) {
    //     $form_errors = array();
    //     $key = "email";
    //     // Check if the email key exists in $data (likely $_POST) and is not null
    //     if (isset($data[$key]) && $data[$key] != null) {
    //         // Sanitize and validate the email from $data
    //         $email = filter_var($data[$key], FILTER_SANITIZE_EMAIL);
    //         if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    //             $form_errors[] = $email . " is not a valid email address";
    //         }
    //     }
    //     return $form_errors;
    // }

?>
