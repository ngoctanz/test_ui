# Ràng Buộc Luồng Hoạt Động (App Flow Constraints)

Tài liệu này định nghĩa cấu trúc màn hình, kích thước giao diện và các luồng chức năng bắt buộc cho ứng dụng Sạc Xe Điện (EV Charging App) dựa trên sơ đồ luồng được cung cấp. Bất kỳ giao diện nào được phát triển đều phải tuân theo cấu trúc này.

## 0. Ràng buộc về Kích Thước và Khung Giao Diện (Mobile UI Sizing)
Vì đây là ứng dụng thiết kế chuyên biệt cho thiết bị di động (Mobile App), giao diện React cần tuân thủ các quy tắc kích thước sau:
- **Kích thước khung chuẩn (Mobile View):** `402px × 874px` (tương đương iPhone 16/17 Pro 6.3 inch).
- **Container gốc (`#root` hoặc wrapper):**
  - Cần căn giữa trên màn hình Desktop: `max-width: 402px`, `margin: 0 auto`.
  - Có độ cao đầy đủ: `min-height: 100dvh` hoặc `height: 100dvh`.
  - Sử dụng border hoặc shadow nhẹ để phân tách vùng mobile app với background desktop.
  - Overflow: `overflow-x: hidden`, `overflow-y: auto`.
- **Thẻ Meta Viewport bắt buộc (trong `index.html`):**
  `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">`

---

## 1. Luồng Chưa Đăng Nhập (Guest Flow - Đăng ký / Đăng nhập)

### 1.1. Màn hình Đăng nhập (Login)
- **Trường thông tin bắt buộc:**
  - `Số điện thoại (SDT)`
  - `Mật khẩu`
- **Hành động:** Đăng nhập thành công sẽ chuyển vào "Luồng Đã Đăng Nhập".

### 1.2. Màn hình Đăng ký (Register)
- **Trường thông tin bắt buộc:**
  - `Tên người dùng`
  - `Số điện thoại (Zalo)`
  - `Mật khẩu`
  - `OTP xác thực Zalo` (Hiển thị sau khi nhập SĐT hợp lệ)

### 1.3. Màn hình Quên mật khẩu (Forgot Password)
- **Trường thông tin bắt buộc:**
  - `Số điện thoại (SDT)`
  - `Mã OTP` (Gửi về SĐT)
  - `Mật khẩu mới`

---

## 2. Luồng Đã Đăng Nhập (Authenticated Flow - Đăng nhập thành công)

Sau khi đăng nhập thành công, người dùng có thể truy cập các màn hình chính sau (thường được đặt ở Bottom Navigation hoặc Sidebar):

### 2.1. Trang chủ (Home)
- **Thông tin hiển thị:**
  - `Số dư tài khoản`
  - `Gợi ý trạm sạc gần nhất`
- **Thành phần Phiên sạc (Charging Session) - (Chỉ hiện khi đang sạc):**
  - `% Pin của xe`
  - `Công suất đã sạc được`
  - `Thời gian sạc`

### 2.2. Bản đồ (Map)
- **Chức năng:** Hiển thị vị trí các trạm sạc trên bản đồ (Google Maps / Mapbox).

### 2.3. Quét mã sạc (Scan QR)
- **Chức năng:** Mở camera quét mã QR trên trụ sạc để bắt đầu phiên sạc.

### 2.4. Tài khoản (Account / Profile)
Màn hình quản lý tài khoản bao gồm các mục con:

#### 2.4.1. Thông tin Người dùng (User Profile)
- `Ảnh đại diện (AVT)`
- `Tên người dùng`
- `Số điện thoại (SDT)`
- `Ngày tháng năm sinh`
- `Địa chỉ`

#### 2.4.2. Cấu hình hóa đơn (Invoice Configuration)
- `Tên công ty`
- `Mã số thuế (MST)`
- `Địa chỉ công ty`
- `Email nhận hóa đơn`

#### 2.4.3. Đổi mật khẩu (Change Password)
- Form đổi mật khẩu mới.
