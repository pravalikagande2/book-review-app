import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/books`, { title, author, description, genre, publishedYear }, config);

      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Add a New Book</h1>
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
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;