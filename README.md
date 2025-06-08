
# MD5 Key Server

Server xác thực và tạo key (VIP/Thường).

## Setup

```bash
git clone <your_repo_url>
cd md5-key-server
npm install
npm start
```

## Endpoints

- `GET /verify?key=<KEY>`: xác thực key
- `GET /create-key?admin=<SECRET>&role=vip|normal`: tạo key mới

## Triển khai

- Render/Vercel/Railway: kết nối repo, đặt biến `ADMIN_SECRET` trong phần ENV
