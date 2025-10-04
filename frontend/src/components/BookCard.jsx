import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookCard = ({ book, handleDelete }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
        <p className="card-text text-muted small">Genre: {book.genre}</p>
        <p className="card-text flex-grow-1">{book.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/books/${book._id}`} className="card-link">
            View Details & Reviews
          </Link>
          {user && user._id === book.addedBy && (
            <div className="d-flex gap-2">
              <Link to={`/books/edit/${book._id}`} className="btn btn-warning btn-sm">
                Edit
              </Link>
              <button onClick={() => handleDelete(book._id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;