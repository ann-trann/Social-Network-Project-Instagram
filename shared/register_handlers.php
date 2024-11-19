<?php
    require_once "core/init.php";
    if(loggedIn()){
        Redirect::to('home.php');
    }

    if (Input::exists()){
        if(isset($_POST['submitButton'])){
            // Tạm thời bỏ qua validation và database
            session_regenerate_id();
            $_SESSION['user_id'] = 1; // Giả lập một user_id
            Redirect::to('home.php');
        }

        // if(isset($_POST['submitButton'])){
        //     $form_errors=array();
        //     $required_fields=array("email", "password", "username", "full_name");
        //     $form_errors=array_merge($form_errors,check_empty_fields($required_fields));
        //     $fields_to_check_length=array("fullname"=>3,"username"=>3,"password"=>6);
        //     $form_errors=array_merge($form_errors,check_min_length($fields_to_check_length));
        //     $form_errors=array_merge($form_errors,check_email($_POST));

        //     $rules=[
        //         'email'=>array('unique'=>'users'), 
        //         'username'=>array('unique'=>'users'),
        //         'password'=>array('max'=>30)
        //         ];
            
        //     $account->check($_POST,$rules);

        //     if($account->passed()) {
        //         //check if error array is empty, if yes process form data and insert record
        //         if(empty($form_errors)) {
        //             $username=escape($_POST['username']);
        //             $fullName=escape($_POST['full_name']);
        //             $email=escape($_POST['email']);
        //             $password=escape($_POST['password']);

        //             $user_id=$account->register_user($username,$fullName,$email,$password);
        //             if($user_id){
        //                 session_regenerate_id();
        //                 $_SESSION['user_id']=$user_id;
                        
        //                 Redirect::to('index');
        //             }
        //         }
        //         }else{ 
        //             $form_errors=array_merge($form_errors,$account->errors());
        //         }
        // }
    }

    $title="Register • Instagram";
    $keywords = "Instagram, Share and capture world's moments, share, capture, share, login, signup";

?>