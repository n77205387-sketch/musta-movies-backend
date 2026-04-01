const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Upload = require('../models/Upload');

const JWT_SECRET = process.env.JWT_SECRET || 'musta-secret-key-2026';

// Get all uploads by type
router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const uploads = await Upload.find({ type });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user uploads
router.get('/user/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const uploads = await Upload.find({ userId: decoded.id });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const uploads = await Upload.find({ userId });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload movie
router.post('/movie', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Simulated file URL (in production, use cloud storage like AWS S3)
        const fileUrl = `https://example.com/movies/movie-${Date.now()}.mp4`;
        
        const upload = new Upload({
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'movie',
            name: req.body.fileName || 'Movie',
            size: req.body.fileSize || 0,
            url: fileUrl,
            description: req.body.description || ''
        });

        await upload.save();
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
router.post('/music', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const fileUrl = `https://example.com/music/music-${Date.now()}.mp3`;
        
        const upload = new Upload({
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'music',
            name: req.body.fileName || 'Music',
            size: req.body.fileSize || 0,
            url: fileUrl
        });

        await upload.save();
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
router.post('/mixtape', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const fileUrl = `https://example.com/mixtapes/mixtape-${Date.now()}.mp3`;
        
        const upload = new Upload({
            userId: decoded.id,
            username: decoded.email?.split('@')[0] || 'user',
            type: 'mixtape',
            name: req.body.fileName || 'Mixtape',
            size: req.body.fileSize || 0,
            url: fileUrl,
            djName: req.body.djName || decoded.email?.split('@')[0] || 'DJ Unknown'
        });

        await upload.save();
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
