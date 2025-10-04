import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
      setBook(data.book);
      setReviews(data.reviews);
      setLoading(false);
    } catch (err) {
      setError('Could not fetch book details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    if (!reviewText) {
      setReviewError('Please write a review.');
      return;
    }
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/books/${id}/reviews`, { rating, reviewText }, config);
      setRating(5);
      setReviewText('');
      fetchBookDetails(); 
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}`, config);
        fetchBookDetails();
      } catch (err) {
        console.error('Failed to delete review', err);
        setReviewError('Failed to delete the review.');
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!book) return <p className="text-center mt-5">Book not found.</p>;

  return (
    <div className="container mt-5">
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h1 className="card-title h2">{book.title}</h1>
              <h5 className="card-subtitle mb-2 text-body-secondary">by {book.author}</h5>
              <p className="card-text"><small className="text-body-secondary">Published: {book.publishedYear} | Genre: {book.genre}</small></p>
              <p className="card-text">{book.description}</p>
            </div>
          </div>
          {user && (
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title h4">Write a Review</h2>
                {reviewError && <p className="alert alert-danger">{reviewError}</p>}
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="form-select">
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={3}>3 - Good</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reviewText" className="form-label">Review</label>
                    <textarea id="reviewText" rows="3" value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="form-control" placeholder="What did you think of the book?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
              </div>
            </div>
          )}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title h4 mb-4">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="list-group list-group-flush">
                  {reviews.map((review) => (
                    <div key={review._id} className="list-group-item">
                      <p className="fw-bold">Rating: {review.rating} / 5</p>
                      <p className="mb-1">{review.reviewText}</p>
                      {user && user._id === review.userId && (
                        <button onClick={() => handleDeleteReview(review._id)} className="btn btn-sm btn-outline-danger mt-2">
                          Delete My Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body-secondary">No reviews yet. Be the first to write one!</p>
              )}
            </div>
          </div>
        </>
    </div>
  );
};

export default BookDetailsPage;