const Market = require("../models/Market");
const Farmer = require("../models/Farmer");
const Company = require("../models/Company");

exports.buyCarbonCredits = async (req, res) => {
  try {
    const { userEmail, marketId } = req.body;

    // Find the market entry
    const marketItem = await Market.findById(marketId);
    if (!marketItem) {
      return res.status(404).json({ message: "Market item not found" });
    }

    // Deduct carbon points and remove from market
    const carbonPoints = marketItem.carbonPoints;

    // Remove the market entry (simulating purchase)
    await Market.findByIdAndDelete(marketId);

    // Update the buyer's (Farmer or Company) carbon points
    let buyer = await Farmer.findOne({ email: userEmail });
    if (!buyer) {
      buyer = await Company.findOne({ email: userEmail });
    }

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    // Add the purchased carbon points to the buyer
    buyer.carbonPoint += carbonPoints;
    await buyer.save();

    return res
      .status(200)
      .json({ message: "Carbon credits purchased successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
