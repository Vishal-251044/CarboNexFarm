const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET company by email
router.get('/:email', async (req, res) => {
  try {
    const company = await Company.findOne({ email: req.params.email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
