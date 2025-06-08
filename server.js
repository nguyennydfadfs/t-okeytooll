
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
app.use(cors());

const KEYS_FILE = './keys.json';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'phungpham';

let keys = {};
if (fs.existsSync(KEYS_FILE)) {
  keys = JSON.parse(fs.readFileSync(KEYS_FILE));
}

function generateKey() {
  return crypto.randomBytes(8).toString('hex');
}

app.get('/verify', (req, res) => {
  const key = req.query.key;
  const role = keys[key];
  if (role) res.json({ success: true, role });
  else res.json({ success: false, message: 'Key không hợp lệ' });
});

app.get('/create-key', (req, res) => {
  const { admin, role } = req.query;
  if (admin !== ADMIN_SECRET) {
    return res.json({ success: false, message: 'Không có quyền tạo key' });
  }
  if (!['vip', 'normal'].includes(role)) {
    return res.json({ success: false, message: 'Loại key không hợp lệ' });
  }
  const newKey = generateKey();
  keys[newKey] = role;
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
  res.json({ success: true, key: newKey });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
