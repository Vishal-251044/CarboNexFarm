const express = require('express');
const router = express.Router();
const { fetchMarketData } = require('../controllers/marketDataController');

router.get('/market-data', fetchMarketData);

module.exports = router;
