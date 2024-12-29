const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  carbonPoint: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Company', companySchema);
