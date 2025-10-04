import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-body-tertiary">
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-control" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Logging In...' : 'Login'}
                </button>
                <Link to="/signup" className="btn btn-outline-secondary">
                    Don't have an account? Sign Up
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;