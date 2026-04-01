const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'musta-secret-key-2026';

// In-memory storage (will clear on server restart - replace with MongoDB later)
let uploads = [];

// Get all uploads by type (PUBLIC - for community viewing)
router.get('/public/:type', (req, res) => {
    const { type } = req.params;
    const filtered = uploads.filter(u => u.type === type);
    res.json(filtered);
});

// Get all public uploads
router.get('/public', (req, res) => {
    res.json(uploads);
});

// Get user uploads
router.get('/user/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userUploads = uploads.filter(u => u.userId === decoded.id);
        res.json(userUploads);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const filtered = uploads.filter(u => u.userId === userId);
    res.json(filtered);
});

// Upload movie
router.post('/movie', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const fileUrl = `https://example.com/movies/movie-${Date.now()}.mp4`;
        
        const upload = {
            _id: Date.now().toString(),
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'movie',
            name: req.body.fileName || 'Movie',
            size: req.body.fileSize || 0,
            url: fileUrl,
            description: req.body.description || '',
            uploadedAt: new Date()
        };

        uploads.push(upload);
        
        res.json({
            message: 'Movie uploaded successfully',
            url: fileUrl,
            upload: upload
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload music
router.post('/music', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const fileUrl = `https://example.com/music/music-${Date.now()}.mp3`;
        
        const upload = {
            _id: Date.now().toString(),
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'music',
            name: req.body.fileName || 'Music',
            size: req.body.fileSize || 0,
            url: fileUrl,
            uploadedAt: new Date()
        };

        uploads.push(upload);
        
        res.json({
            message: 'Music uploaded successfully',
            url: fileUrl,
            upload: upload
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload mixtape
router.post('/mixtape', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const fileUrl = `https://example.com/mixtapes/mixtape-${Date.now()}.mp3`;
        
        const upload = {
            _id: Date.now().toString(),
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'mixtape',
            name: req.body.fileName || 'Mixtape',
            size: req.body.fileSize || 0,
            url: fileUrl,
            djName: req.body.djName || decoded.email?.split('@')[0] || 'DJ Unknown',
            uploadedAt: new Date()
        };

        uploads.push(upload);
        
        res.json({
            message: 'Mixtape uploaded successfully',
            url: fileUrl,
            upload: upload
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
