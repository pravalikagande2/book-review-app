import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    publishedYear: { 
        type: Number, 
        required: true 
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // This creates the connection to the User model
    },
}, { 
    timestamps: true 
});

const Book = mongoose.model('Book', bookSchema);

export default Book;