const express = require('express');
const router = express.Router();
const marketSellController = require('../controllers/marketBuyController');

router.post('/buy-carbon', marketSellController.buyCarbonCredits);

module.exports = router;
