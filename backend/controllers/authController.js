const Farmer = require('../models/Farmer');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

// Register Farmer
exports.registerFarmer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const farmerExists = await Farmer.findOne({ email });
    if (farmerExists) {
      return res.status(400).json({ message: 'Farmer already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = new Farmer({
      name,
      email,
      password: hashedPassword,
    });

    await newFarmer.save();
    res.status(201).json({ message: 'Farmer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Company
exports.registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
