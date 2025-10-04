import Book from '../models/bookModel.js';
import Review from '../models/reviewModel.js';

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
    // We get the book data from the request body
    const { title, author, description, genre, publishedYear } = req.body;

    try {
        const book = new Book({
            title,
            author,
            description,
            genre,
            publishedYear,
            // This is the crucial part: we link the book to the logged-in user
            // The 'req.user' object comes from our 'protect' middleware
            addedBy: req.user._id, 
        });

        // Save the new book to the database
        const createdBook = await book.save();
        
        // Send the newly created book back as a response
        res.status(201).json(createdBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating book' });
    }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    // Check for a search keyword from the query string
    const keyword = req.query.keyword
        ? {
            // Search in both the title and the author fields
            $or: [
                { title: { $regex: req.query.keyword, $options: 'i' } }, // 'i' for case-insensitive
                { author: { $regex: req.query.keyword, $options: 'i' } },
            ],
        }
        : {}; // If no keyword, this object is empty and finds all books

    try {
        const count = await Book.countDocuments({ ...keyword });
        const books = await Book.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            books,
            page,
            pages: Math.ceil(count / pageSize)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching books' });
    }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            // Also find all reviews associated with this book
            const reviews = await Review.find({ bookId: req.params.id });
            // Combine the book and its reviews into a single response
            res.json({ book, reviews });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching book' });
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
    try {
        const { title, author, description, genre, publishedYear } = req.body;
        
        // Find the book by the ID from the URL
        const book = await Book.findById(req.params.id);

        if (book) {
            // IMPORTANT: Check if the logged-in user is the one who created the book
            // We convert the ObjectID to a string for comparison
            if (book.addedBy.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'User not authorized' });
                return;
            }

            // If the user is authorized, update the book's fields
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.genre = genre || book.genre;
            book.publishedYear = publishedYear || book.publishedYear;

            // Save the updated book to the database
            const updatedBook = await book.save();
            res.json(updatedBook);

        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating book' });
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            // Check if the logged-in user is the one who created the book
            if (book.addedBy.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'User not authorized' });
                return;
            }

            // If the user is authorized, delete the book
            await Book.deleteOne({ _id: req.params.id });
            res.json({ message: 'Book removed' });

        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting book' });
    }
};
export { createBook, getBooks, getBookById, updateBook, deleteBook };