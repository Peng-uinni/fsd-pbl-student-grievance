const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); 

connectDB();
const app = express();

// Configure CORS to allow Authorization header and cookies
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your Vite dev server port
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));

// Parse JSON bodies and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files (if any)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---
const complaintRoutes = require('./routes/ComplaintRoutes');
const authRoutes = require('./routes/AuthRoutes');
app.use('/api/complaints', complaintRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });