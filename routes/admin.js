const express = require('express');
const router = express.Router();

// Get admin stats
router.get('/stats', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    res.json({
        totalUsers: 1250,
        totalMovies: 450,
        totalRevenue: 15000000,
        totalTransactions: 3420,
        activeSubscriptions: 350,
        newUsersThisMonth: 120,
        topMovies: [
            { title: 'The Pearl of Africa', views: 5420 },
            { title: 'Kampala Nights', views: 4890 },
            { title: 'Heart of the Pearl', views: 4210 }
        ],
        revenueByMonth: [
            { month: 'Jan', revenue: 1200000 },
            { month: 'Feb', revenue: 1450000 },
            { month: 'Mar', revenue: 1600000 }
        ]
    });
});

// Get users
router.get('/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    res.json([
        {
            id: 1,
            username: 'admin',
            email: 'admin@mustamovies.com',
            isPaid: true,
            joinedDate: '2024-01-15'
        },
        {
            id: 2,
            username: 'demo',
            email: 'demo@mustamovies.com',
            isPaid: false,
            joinedDate: '2024-02-20'
        }
    ]);
});

// Get transactions
router.get('/transactions', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    res.json([
        {
            id: 'TXN-001',
            userId: 1,
            amount: 5000,
            status: 'completed',
            date: new Date()
        },
        {
            id: 'TXN-002',
            userId: 2,
            amount: 6000,
            status: 'completed',
            date: new Date()
        }
    ]);
});

module.exports = router;
