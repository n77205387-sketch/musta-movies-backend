const express = require('express');
const router = express.Router();

// Sample movies data
const movies = [
    {
        _id: '1',
        title: 'The Pearl of Africa',
        genre: 'Drama',
        price: 5000,
        description: 'A gripping story of love and ambition in Kampala',
        duration: 120,
        year: 2024,
        image: 'https://via.placeholder.com/200x300?text=Pearl+of+Africa',
        rating: 4.8
    },
    {
        _id: '2',
        title: 'Kampala Nights',
        genre: 'Action',
        price: 6000,
        description: 'High-octane action thriller set in Uganda',
        duration: 135,
        year: 2024,
        image: 'https://via.placeholder.com/200x300?text=Kampala+Nights',
        rating: 4.5
    },
    {
        _id: '3',
        title: 'Heart of the Pearl',
        genre: 'Romance',
        price: 4500,
        description: 'A romantic journey through Uganda',
        duration: 110,
        year: 2023,
        image: 'https://via.placeholder.com/200x300?text=Heart+of+Pearl',
        rating: 4.6
    },
    {
        _id: '4',
        title: 'The Last Hunt',
        genre: 'Adventure',
        price: 7000,
        description: 'Adventure in the wild savannas',
        duration: 150,
        year: 2024,
        image: 'https://via.placeholder.com/200x300?text=The+Last+Hunt',
        rating: 4.7
    },
    {
        _id: '5',
        title: 'Laughter in the City',
        genre: 'Comedy',
        price: 3500,
        description: 'A hilarious comedy about city life',
        duration: 95,
        year: 2024,
        image: 'https://via.placeholder.com/200x300?text=Laughter+in+City',
        rating: 4.4
    }
];

// Get all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Get single movie
router.get('/:id', (req, res) => {
    const movie = movies.find(m => m._id === req.params.id);
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
});

// Watch movie (requires authentication)
router.get('/:id/watch', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    const movie = movies.find(m => m._id === req.params.id);
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    // Return video URL
    res.json({
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
        movie: movie
    });
});

// Rate movie
router.post('/:id/rate', (req, res) => {
    const { rating } = req.body;
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    res.json({ message: 'Rating saved', rating });
});

module.exports = router;
