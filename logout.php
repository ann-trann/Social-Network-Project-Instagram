<?php
    require_once 'core/init.php';
    require_once(__DIR__ . '/shared/config.php');

    // Kiểm tra nếu token tồn tại trong cookies
    if (isset($_COOKIE['token'])) {
        // Gửi yêu cầu tới API logout để hủy token
        $url = API_URL . '/auth/logout';
        $token = $_COOKIE['token'];

        // Khởi tạo cURL
        $ch = curl_init($url);

        // Cấu hình cURL
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['token' => $token]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
        ]);

        // Gửi yêu cầu và nhận phản hồi
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Kiểm tra lỗi cURL
        if (curl_errno($ch)) {
            echo 'cURL Error: ' . curl_error($ch);
        } elseif ($http_code === 200) {
            // Xóa tất cả cookie đã lưu
            setcookie('token', '', time() - 3600, '/');
            setcookie('userId', '', time() - 3600, '/');
            setcookie('username', '', time() - 3600, '/');
            setcookie('gender', '', time() - 3600, '/');
            setcookie('avatar', '', time() - 3600, '/');
            setcookie('bio', '', time() - 3600, '/');


            // Redirect về trang đăng nhập
            header('Location: login');
            exit();
        } else {
            echo "Error during logout: $http_code";
        }

        // Đóng cURL
        curl_close($ch);
    } else {
        // Token không tồn tại trong cookie, chuyển về trang login
        header('Location: login');
        exit();
    }
?>

