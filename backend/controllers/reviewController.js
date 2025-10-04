import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';

// @desc    Add a new review to a book
// @route   POST /api/books/:id/reviews
// @access  Private
const addReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    const { id: bookId } = req.params; // Get book ID from URL params

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        // Check if the user has already reviewed this book
        const alreadyReviewed = await Review.findOne({
            bookId: bookId,
            userId: req.user._id,
        });

        if (alreadyReviewed) {
            res.status(400).json({ message: 'You have already reviewed this book' });
            return;
        }

        // Create the new review
        const review = await Review.create({
            bookId,
            userId: req.user._id,
            rating,
            reviewText,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while adding review' });
    }
};


// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        // Check if the logged-in user is the one who wrote the review
        if (review.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await Review.deleteOne({ _id: reviewId });
        res.json({ message: 'Review removed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting review' });
    }
};

export { addReview, deleteReview };