require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// ✅ Enable CORS properly for your Next.js frontend
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true,               // allow cookies or auth headers
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('✅ LMS Backend is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
