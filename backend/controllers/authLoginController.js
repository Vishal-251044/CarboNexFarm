const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');
const Company = require('../models/Company');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    if (userType === 'farmer') {
      user = await Farmer.findOne({ email });
    } else if (userType === 'company') {
      user = await Company.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, userType }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      userType,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
