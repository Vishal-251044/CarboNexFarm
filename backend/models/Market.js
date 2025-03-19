const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  farmerName: { type: String, required: true }, 
  carbonPoints: { type: Number, required: true }, 
  transactionDate: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Market', marketSchema);
