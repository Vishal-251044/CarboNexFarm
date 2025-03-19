const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// GET farmer by email
router.get('/:email', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ email: req.params.email });
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
