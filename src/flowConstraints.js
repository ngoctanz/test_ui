// Định nghĩa các luồng và ràng buộc dữ liệu cho ứng dụng
// Đảm bảo UI luôn tuân theo thiết kế từ mindmap.

// Kích thước chuẩn cho UI
export const LAYOUT_CONSTRAINTS = {
  MAX_WIDTH: 402, // px (iPhone 16/17 Pro 6.3 inch)
  MAX_HEIGHT: 874, // px
  ASPECT_RATIO_PREFERENCE: '19.5:9' // Tỉ lệ phổ biến của iPhone
};

export const APP_ROUTES = {
  // 1. LUỒNG AUTH (Chưa đăng nhập)
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  
  // 2. LUỒNG MAIN (Đã đăng nhập)
  MAIN: {
    HOME: '/home',
    MAP: '/map',
    SCAN_QR: '/scan',
    ACCOUNT: '/account',
  },

  // 3. CÁC MỤC TRONG TÀI KHOẢN
  ACCOUNT_SUB: {
    PROFILE: '/account/profile',
    INVOICE: '/account/invoice',
    CHANGE_PASSWORD: '/account/change-password',
  }
};

// Ràng buộc dữ liệu (Form validation fields)
export const FORM_CONSTRAINTS = {
  LOGIN: ['phone', 'password'],
  REGISTER: ['username', 'phoneZalo', 'password', 'otpZalo'],
  FORGOT_PASSWORD: ['phone', 'otp', 'newPassword'],
  
  PROFILE: ['avatar', 'username', 'phone', 'dob', 'address'],
  INVOICE: ['companyName', 'taxId', 'address', 'email'],
};

// Cấu trúc dữ liệu yêu cầu cho màn hình Trang chủ (Đang sạc)
export const CHARGING_SESSION_SCHEMA = {
  batteryPercentage: null, // % Pin
  chargedCapacity: null,   // Công suất đã sạc
  chargingTime: null       // Thời gian sạc
};
