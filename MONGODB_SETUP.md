// MongoDB Atlas Free Tier Setup Guide
// This will enable persistent data storage for your MUSTA MOVIES platform

// 1. Go to https://www.mongodb.com/cloud/atlas
// 2. Sign up (free account)
// 3. Create a free cluster
// 4. Get your connection string (looks like):
//    mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/musta-movies?retryWrites=true&w=majority

// 5. Create a .env file in your backend folder with:
//    MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/musta-movies?retryWrites=true&w=majority

// 6. Update package.json dependencies (already done - mongoose is included)

// 7. Restart the server:
//    node server.js

// Now all uploads will be permanently stored!

// To use in your backend:
// - Uploads are saved to MongoDB automatically
// - Frontend can retrieve them from /api/upload/type/movie (or music/mixtape)
// - Uploads persist across devices!

// Test it:
// 1. Upload a file on Device A
// 2. Open the app on Device B
// 3. You'll see the same files! ✅
