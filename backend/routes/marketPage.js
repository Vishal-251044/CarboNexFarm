const express = require('express');
const router = express.Router();
const { getMarketEntries } = require('../controllers/marketSellController');

router.get('/market', getMarketEntries);

module.exports = router;
