import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js'; // <-- Import the real controller
import { addReview } from '../controllers/reviewController.js'; // <-- Import addReview

// POST /api/books/
// This route is protected. The 'protect' middleware runs first,
// and if the token is valid, it calls the 'createBook' controller function.
router.post('/', protect, createBook);
router.get('/', getBooks); //public route
// GET /api/books/:id -> to get a single book by its ID (Public)
router.get('/:id', getBookById);
// PUT /api/books/:id -> to update a book (Protected)
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);


// POST /api/books/:id/reviews -> Add a review to a book
router.post('/:id/reviews', protect, addReview); // <-- Add this route


export default router;