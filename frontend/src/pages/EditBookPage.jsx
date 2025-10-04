import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const EditBookPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // We use the VITE_API_URL environment variable now
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
        setTitle(data.book.title);
        setAuthor(data.book.author);
        setDescription(data.book.description);
        setGenre(data.book.genre);
        setPublishedYear(data.book.publishedYear);
      } catch (err) {
        setError('Could not fetch book data.');
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
      await axios.put(`${import.meta.env.VITE_API_URL}/api/books/${id}`, { title, author, description, genre, publishedYear }, config);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Edit Book</h1>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-body-tertiary">
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input className="form-control" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="author">Author</label>
              <input className="form-control" id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="genre">Genre</label>
              <input className="form-control" id="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="publishedYear">Published Year</label>
              <input className="form-control" id="publishedYear" type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
            </div>
            <button className="btn btn-warning" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;