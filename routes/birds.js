 const express = require('express');
const router = express.Router();
const Bird = require('../models/Bird');

// @route   POST /api/birds
// @desc    Create a new bird entry
router.post('/', async (req, res) => {
  try {
    const { name, location, date, notes } = req.body;
    const newBird = new Bird({ name, location, date, notes });
    await newBird.save();
    res.status(201).json(newBird);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/birds
// @desc    Get all bird entries
router.get('/', async (req, res) => {
  try {
    const birds = await Bird.find();
    res.json(birds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

