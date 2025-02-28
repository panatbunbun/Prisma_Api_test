const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ ตรวจสอบว่าไฟล์ `routes/customers.js` มีอยู่
const customerRoutes = require('./routes/customers');
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
