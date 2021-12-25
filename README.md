# Bảo mật cho mô hình hệ thống phân tán

Cách phòng chống XSS (Cross site scripting) và ngăn chặn leak data bằng CORS.

## Requirement

    NodeJS: ^16.0.0

## Port

    Auth server: 8000
    Student manager server http/https: 8080/8088
    Render server: 3000

## Hướng dẫn chạy chương trình (Windows)

1. Đảm bảo máy tính đã cài đặt NodeJS

2. Chương trình có 3 thư mục chính

    - auth-server-security
    - student-manager-server-security
    - client-server-security

3. Chạy file **install.bat** trong thử mục giải nén để cài đặt node_modules ở cả 3 thư mục server (Chỉ dùng ở lần chạy đầu tiên)

4. Chạy file **run.bat** trong thử mục giải nén để chạy cả 3 server

5. Truy cập địa chỉ <https://localhost:3000> để vào giao diện client

6. Truy cập <https://localhost:8088> để mở quyền truy cập của browser cho server (Nếu không thể load được dữ liệu vì file cert tự tạo, chưa được windows chứng thực)
