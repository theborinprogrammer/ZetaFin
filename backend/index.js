const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/transactions', require('./routes/transactions'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});