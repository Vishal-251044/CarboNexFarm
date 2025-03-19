const express = require('express');
const { registerFarmer, registerCompany } = require('../controllers/authController');
const router = express.Router();

router.post('/register/farmer', registerFarmer);
router.post('/register/company', registerCompany);

module.exports = router;
