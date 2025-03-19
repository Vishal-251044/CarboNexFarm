const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authLoginRoutes = require('./routes/authLoginRoutes');
const farmerRoutes = require('./routes/farmer');
const companyRoutes = require('./routes/company');
const farmerUpdateRoutes = require('./routes/farmerUpdateRoutes'); 
const marketSellRoutes = require('./routes/marketSellRoutes');
const marketDataRoutes = require('./routes/marketDataRoutes'); 
const marketBuyRoutes = require('./routes/marketBuyRoutes');

const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/auth', authLoginRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/farmer', farmerUpdateRoutes);
app.use('/api', marketSellRoutes);
app.use('/api', marketDataRoutes);
app.use('/api', marketBuyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
