const Farmer = require("../models/Farmer");
const Market = require("../models/Market");

exports.sellCarbon = async (req, res) => {
  const { email, carbonCreditPoints } = req.body; // Get email and carbon credit points from request

  try {
    const farmer = await Farmer.findOne({ email }); // Find farmer by email
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Check if the farmer has enough carbon points
    if (carbonCreditPoints <= 0 || carbonCreditPoints > farmer.carbonPoint) {
      return res.status(400).json({ message: "Invalid carbon points" });
    }

    // Deduct carbon points
    farmer.carbonPoint -= carbonCreditPoints;
    await farmer.save();

    // Create a new market entry with farmer details
    const marketEntry = new Market({
      farmerName: farmer.name, // Store farmer's name
      carbonPoints: carbonCreditPoints, // Store carbon points sold
    });
    await marketEntry.save();

    res.status(200).json({ message: "Carbon credit sold successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
