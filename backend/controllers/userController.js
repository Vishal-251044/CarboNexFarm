const Farmer = require('../models/Farmer');
const Company = require('../models/Company');

const getUserProfile = async (req, res) => {
  const { email } = req.query;  

  try {
    let user = await Farmer.findOne({ email });
    
    if (user) {
      return res.status(200).json({ userType: 'farmer', user });
    }
    
    user = await Company.findOne({ email });
    
    if (user) {
      return res.status(200).json({ userType: 'company', user });
    }

    return res.status(404).json({ message: 'User not found' });
    
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user data', error });
  }
};

module.exports = { getUserProfile };
