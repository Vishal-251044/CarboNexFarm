const express = require('express');
const { addContactMessage } = require('../controllers/contactController');
const router = express.Router();

router.post('/contact', addContactMessage);

module.exports = router;
