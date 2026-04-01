# MUSTA MOVIES UG - Backend API

Backend API server for MUSTA MOVIES UG streaming platform built with Express.js.

## Features

- ✅ User Authentication (Login/Register)
- ✅ Movie Management
- ✅ Music & Mixtape uploads
- ✅ M-Pesa Payment Integration
- ✅ Admin Dashboard with Statistics
- ✅ JWT Token-based authentication
- ✅ CORS enabled

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **MongoDB** - Database (optional)
- **Multer** - File uploads

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/n77205387-sketch/musta-movies.git
   cd musta-movies-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your configuration**
   ```
   PORT=3000
   JWT_SECRET=your-secret-key
   ```

## Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `GET /api/movies/:id/watch` - Watch movie (requires auth)
- `POST /api/movies/:id/rate` - Rate movie

### Uploads
- `POST /api/upload/movie` - Upload movie (requires auth)
- `POST /api/upload/music` - Upload music (requires auth)
- `POST /api/upload/mixtape` - Upload mixtape (requires auth)

### Payments
- `POST /api/payment/mpesa/initiate` - Initiate M-Pesa payment
- `POST /api/payment/mpesa/callback` - M-Pesa callback
- `GET /api/payment/status/:transactionId` - Check payment status

### Admin
- `GET /api/admin/stats` - Get admin statistics (admin only)
- `GET /api/admin/users` - Get users list (admin only)
- `GET /api/admin/transactions` - Get transactions (admin only)

## Demo Credentials

- **Admin**: admin@mustamovies.com / AdminPassword123!
- **User**: demo@mustamovies.com / DemoPassword123!

## Project Structure

```
musta-movies-backend/
├── routes/
│   ├── auth.js
│   ├── movies.js
│   ├── upload.js
│   ├── payment.js
│   └── admin.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Next Steps

1. Connect to MongoDB database
2. Implement file upload storage (AWS S3 or similar)
3. Integrate real M-Pesa API
4. Add email notifications
5. Implement rate limiting
6. Add comprehensive logging

## Frontend

Frontend is deployed at: https://69cd1f3778e4535906ba4588--jocular-licorice-c2169f.netlify.app

Update the `API_URL` in frontend to point to your backend server.

## License

ISC
# Restart deployment
