const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketSellController');

router.post('/sell-carbon', marketController.sellCarbon);

module.exports = router;
