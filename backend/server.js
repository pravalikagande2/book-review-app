import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // <-- ADD THIS LINE
import bookRoutes from './routes/bookRoutes.js'; // <-- ADD THIS
import reviewRoutes from './routes/reviewRoutes.js'; // <-- ADD THIS
import cors from 'cors';

// Configure dotenv to use environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// This middleware allows us to accept JSON data in the body of requests
app.use(express.json());
app.use(cors())

// A simple test route to make sure the server is responding
// A simple test route to make sure the server is responding
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Tell Express to use the userRoutes for any request that starts with /api/users
app.use('/api/users', userRoutes); // <-- ADD THIS LINE
app.use('/api/books', bookRoutes); // <-- ADD THIS

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes); // <-- ADD THIS

const PORT = process.env.PORT || 5000;

// We will add our real API routes here later
// import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});