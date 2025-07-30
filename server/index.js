require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the Todo API');
});

// Port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

