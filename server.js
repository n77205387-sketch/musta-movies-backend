require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend is running! ✅' });
});

// Import routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const uploadRoutes = require('./routes/upload');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error', message: err.message });
});

// MongoDB Connection (optional for now)
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
      .catch(err => console.log('MongoDB connection error:', err));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🎬 MUSTA MOVIES Backend running on port ${PORT}`);
});
