const Market = require("../models/Market");

// Fetch all market data entries
exports.fetchMarketData = async (req, res) => {
  try {
    const marketData = await Market.find(); // Fetch all records from Market model
    res.status(200).json(marketData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
