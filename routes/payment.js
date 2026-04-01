const express = require('express');
const router = express.Router();

// M-Pesa payment initiation
router.post('/mpesa/initiate', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const { amount, phoneNumber, movieId, transactionType } = req.body;

    if (!amount || !phoneNumber) {
        return res.status(400).json({ error: 'Amount and phone number required' });
    }

    // Generate transaction ID
    const transactionId = 'TXN-' + Date.now();

    res.json({
        message: 'M-Pesa payment initiated successfully',
        transactionId: transactionId,
        amount: amount,
        phoneNumber: phoneNumber,
        status: 'pending'
    });
});

// Payment callback (from M-Pesa)
router.post('/mpesa/callback', (req, res) => {
    const { Body } = req.body;
    
    // Process M-Pesa callback
    console.log('M-Pesa callback:', Body);

    res.json({
        Result: {
            ResultCode: 0,
            ResultDesc: 'The service request has been processed successfully.'
        }
    });
});

// Check payment status
router.get('/status/:transactionId', (req, res) => {
    const { transactionId } = req.params;

    res.json({
        transactionId: transactionId,
        status: 'completed',
        amount: 5000,
        timestamp: new Date()
    });
});

module.exports = router;
