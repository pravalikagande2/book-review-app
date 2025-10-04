import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { token } = useContext(AuthContext);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/books?pageNumber=${page}&keyword=${keyword}`);
      setBooks(data.books);
      setPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError('Could not fetch books. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, keyword]);

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`, config);
        fetchBooks();
      } catch (err) {
        console.error('Failed to delete book', err);
        setError('Failed to delete book.');
      }
    }
  };

  // The JSX for this component is correct, but the functions needed updating.
  // The provided code is the full, correct component.
  return (
    <div className="container mt-4">
      <h1 className="my-4 text-center">Available Books</h1>
      <div className="mb-4 mx-auto" style={{ maxWidth: '500px' }}>
        <input 
          type="text"
          placeholder="Search by title or author..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row g-4">
        {loading ? <div className="col-12 text-center"><p>Loading...</p></div> : 
         error ? <div className="col-12 text-center"><p className="text-danger">{error}</p></div> :
         books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-12 col-md-6 col-lg-4">
              <BookCard book={book} handleDelete={handleDeleteBook} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
      {pages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
            </li>
            <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HomePage;