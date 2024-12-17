<?php
require_once "core/init.php";
require_once(__DIR__ . '/shared/config.php');

// Kiểm tra nếu token tồn tại trong cookies
if (isset($_COOKIE['token'])) {
    $token = $_COOKIE['token'];

    // Tạo yêu cầu cURL để gửi token đến endpoint introspect
    $url = API_URL . '/auth/introspect';
    $data = array('token' => $token);

    // Khởi tạo cURL
    $ch = curl_init($url);

    // Cấu hình cURL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Lấy phản hồi từ server
    curl_setopt($ch, CURLOPT_POST, true);           // Phương thức POST
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Chuyển đổi dữ liệu thành JSON
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json' // Đảm bảo Content-Type là application/json
    ));

    // Gửi yêu cầu và nhận phản hồi
    $response = curl_exec($ch);

    // Kiểm tra lỗi cURL
    if (curl_errno($ch)) {
        echo 'cURL Error: ' . curl_error($ch);
    } else {
        // Xử lý phản hồi từ server introspect
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($http_code === 200) {
            // Giải mã phản hồi JSON
            $response_data = json_decode($response, true);

            // Kiểm tra nếu token hợp lệ
            if (isset($response_data['result']['valid']) && $response_data['result']['valid']) {
                echo 'Token is valid.';
                // Token hợp lệ -> thực hiện redirect
                Redirect::to('home'); // Trang sau khi xác thực thành công
            } else {
                echo 'Token is invalid.';
                Redirect::to('login'); // Chuyển hướng về trang login
            }
        } else {
            echo "HTTP Error: $http_code";
        }
    }

    // Đóng cURL
    curl_close($ch);
} else {
    // Token không tồn tại trong cookies
    Redirect::to('login');
}
?>
