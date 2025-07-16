# Product CMS - Fullstack App (ReactJS + SailsJS + MongoDB)

Một hệ thống quản lý sản phẩm chuyên nghiệp bao gồm:

- Xác thực người dùng với JWT
- Phân quyền (Admin/User)
- CRUD sản phẩm
- Tìm kiếm theo tên sản phẩm phía server
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

### 3. Chạy backend (Sails.js)

```bash
cd backend
npm install

# Tạo file .env (nếu chưa có)
touch .env
# hoặc sao chép từ file mẫu nếu đã có:
# cp .env.example .env

# Cấu hình các biến môi trường trong .env:
# MONGO_URI=
# JWT_SECRET=
# PORT=
# NODE_ENV=

# Khởi động server
npm start
```

Backend sẽ chạy tại: `http://localhost:1337`

### 4. Chạy frontend (React.js)

```bash
cd ../frontend
npm install 
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### 5. Hướng dẫn triển khai

#### a. Triển khai backend trên Render

**Yêu cầu**
- Có tài khoản [Render](https://render.com)
- Repository chứa thư mục `backend/` đã đầy đủ:
  - `package.json` với script `start`
  - `.env` hoặc dùng Environment Variables trên Render
  - Cấu hình `config/env/production.js` đã sẵn sàng

**Các bước triển khai**

1. Chuẩn bị cấu hình dự án

   - Đảm bảo có file `.env` với các biến:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   PORT=1337
   ```
   - Cập nhật `config/env/production.js`

2. Tạo dịch vụ trên Render
   - Truy cập [Render](https://render.com)
   - Nhấn **New Web Service**
   - Chọn kết nối với GitHub, sau đó Chọn repository chứa backend

3. Cấu hình Render Web Services
   - Environment: `Node`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
  
     | Key          | Value                         |
     | ------------ | ----------------------------- |
     | `MONGO_URI`  | your MongoDB URI              |
     | `JWT_SECRET` | your secret key               |
     | `NODE_ENV`   | production                    |
     | `PORT`       | 10000 (hoặc để Render tự gán) |

4. Deploy và kiểm tra
   - Sau khi Render deploy xong, bạn sẽ nhận được một URL dạng: https://your-backend.onrender.com
   - Truy cập thử: https://your-backend.onrender.com/api/v1/products

5. Kết nối frontend
   - Trong thư mục frontend, tạo file `.env.production` với:
   `VITE_API_URL=https://your-backend.onrender.com/api/v1`
   - Deploy frontend trên Vercel như bình thường.

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



