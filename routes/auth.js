const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'musta-secret-key-2026';

// Simulated user database (replace with MongoDB)
let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@mustamovies.com',
        password: bcryptjs.hashSync('AdminPassword123!', 10),
        isAdmin: true,
        isPaid: true,
        subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    {
        id: 2,
        username: 'demo',
        email: 'demo@mustamovies.com',
        password: bcryptjs.hashSync('DemoPassword123!', 10),
        isAdmin: false,
        isPaid: false,
        subscriptionEnd: null
    }
];

// Register
router.post('/register', (req, res) => {
    const { email, password, username } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    const user = {
        id: users.length + 1,
        username: username || email.split('@')[0],
        email,
        password: bcryptjs.hashSync(password, 10),
        isAdmin: false,
        isPaid: false,
        subscriptionEnd: null
    };

    users.push(user);

    const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: '30d' }
    );

    res.json({ 
        message: 'User registered successfully',
        token,
        user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin }
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: '30d' }
    );

    res.json({ 
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin }
    });
});

// Get Current User
router.get('/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            isPaid: user.isPaid,
            subscriptionEnd: user.subscriptionEnd
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
