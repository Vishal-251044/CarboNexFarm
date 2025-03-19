const Farmer = require('../models/Farmer');

exports.updateCarbonPoints = async (req, res) => {
  const { email, carbonPoints } = req.body;

  try {
    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    // Update carbon points
    farmer.carbonPoint += carbonPoints;
    farmer.carbonPoint = parseFloat(farmer.carbonPoint.toFixed(2));
    await farmer.save();

    return res.status(200).json({ message: 'Carbon points updated successfully', carbonPoints: farmer.carbonPoint });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
