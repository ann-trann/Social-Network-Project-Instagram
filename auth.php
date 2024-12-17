<?php
// auth.php

function checkToken() {
    // Kiểm tra nếu token tồn tại trong cookies
    if (isset($_COOKIE['token'])) {
        // Gửi yêu cầu tới API introspect để xác thực token
        $url = 'http://localhost:81/social-network/auth/introspect';
        $token = $_COOKIE['token'];

        // Khởi tạo cURL
        $ch = curl_init($url);

        // Cấu hình cURL
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['token' => $token]));  // Gửi token trong body
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',  // Header với Content-Type là application/json
        ]);

        // Gửi yêu cầu và nhận phản hồi
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Kiểm tra lỗi cURL
        if (curl_errno($ch)) {
            curl_close($ch);
            return false; // Lỗi trong quá trình gửi yêu cầu
        }

        // Đảm bảo API trả về HTTP status code 200
        if ($http_code === 200) {
            $data = json_decode($response, true);

            if (isset($data['result']['valid']) && $data['result']['valid']) {
                curl_close($ch);
                return true;  // Token hợp lệ
            }
        }

        // Nếu token không hợp lệ hoặc không thể xác thực
        curl_close($ch);
        return false;
    }

    // Nếu không có token trong cookie
    return false;
}
