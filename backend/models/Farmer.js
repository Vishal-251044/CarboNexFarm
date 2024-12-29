const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  carbonPoint: { type: Number, default: 0, set: v => parseFloat(v.toFixed(2)) },
});

module.exports = mongoose.model('Farmer', farmerSchema);
