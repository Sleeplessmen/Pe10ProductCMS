# Product CMS - Fullstack App (ReactJS + SailsJS + MongoDB)

Một hệ thống quản lý sản phẩm chuyên nghiệp bao gồm:

- Xác thực người dùng với JWT
- Phân quyền (Admin / User)
- CRUD sản phẩm
- Tìm kiếm theo tên cài đặt phía server
- Phân trang phía server
- Giao diện hỗ trợ dark mode
- Triển khai backend lên Render
- Tài liệu API với Swagger Template

## Công nghệ sử dụng

| Thành phần | Công nghệ                            |
| ---------- | ------------------------------------ |
| Frontend   | ReactJS                              |
| Backend    | Node.js + Sails.js                   |
| Database   | MongoDB                              |
| Auth       | JSON Web Token (JWT)                 |
| API Docs   | Swagger Template                     |
| Triển khai | Render (backend) + Vercel (frontend) |


## Hướng dẫn chạy ứng dụng

### 1. Clone dự án

```bash
git clone https://github.com/Sleeplessmen/Pe10ProductCMS.git product-cms
cd product-cms
```

### 2. Cấu trúc thư mục

```bash
product-cms/
├── frontend/    # ReactJS client
└── backend/     # SailsJS API server
```

### 3. Chạy backend (Sailsjs)

```bash
cd backend
npm install

# Tạo file .env (nếu chưa có)
touch .env
# hoặc cp từ file mẫu nếu đã có:
# cp .env.example .env

# Cấu hình các biến môi trường trong .env:
# MONGO_URI=
# JWT_SECRET=
# PORT=

# Khởi động server
npm start
```

Backend sẽ chạy tại: `http://localhost:1337`

### 4. Chạy frontend (Reactjs)

```bash
cd ../frontend
npm install 
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### 5. Triển khai

#### Backend (Sails.js) - Render

1. Tạo Web Service mới trên [Render](https://render.com)
2. Kết nối git repository backend
3. Cấu hình:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Env Vars:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `NODE_ENV`
     - `PORT` (hoặc để mặc định của Render)
| ⚠️ Nhớ bật CORS trong cấu hình Sails để cho phép domain frontend truy cập API.

#### Frontend - Vercel

1. Truy cập [Vercel](https://vercel.com)
2. Import repository chứa thư mục `frontend/`
3. Cấu hình:
   - Build tool: **Vite**
   - Root directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

| Sau khi deploy, nhớ cập nhật URL của API backend (`VITE_API_URL`) trong `.env` production của Vercel.


## Hướng phát triển tiếp theo

- Upload ảnh sản phẩm (Cloudinary)
- Responsive đầy đủ mobile/tablet
- Xuất danh sách sản phẩm ra Excel
- Đa ngôn ngữ (i18n)



