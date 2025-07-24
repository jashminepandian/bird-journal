const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Routes
const birdRoutes = require('./routes/birds');
app.use('/api/birds', birdRoutes);  // ← This means routes will start with /api/birds

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
