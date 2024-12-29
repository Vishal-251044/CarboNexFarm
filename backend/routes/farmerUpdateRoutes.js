const express = require('express');
const router = express.Router();
const { updateCarbonPoints } = require('../controllers/farmerUpdateController');

router.post('/update-carbon-points', updateCarbonPoints);

module.exports = router;
