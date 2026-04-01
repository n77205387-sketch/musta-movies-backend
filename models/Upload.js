const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String,
    type: {
        type: String,
        enum: ['movie', 'music', 'mixtape'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: Number,
    url: String,
    djName: String,
    description: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Upload', uploadSchema);
