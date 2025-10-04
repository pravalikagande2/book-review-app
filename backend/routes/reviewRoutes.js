import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { deleteReview } from '../controllers/reviewController.js';

// DELETE /api/reviews/:id -> Delete a review
router.delete('/:id', protect, deleteReview);

export default router;