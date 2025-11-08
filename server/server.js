const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')

const connectDB = require('./config/db');

dotenv.config({ path: '../.env'}); 

connectDB();
const app = express();

app.use(cors());  // CORS for frontend API requests
app.use(express.json());

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