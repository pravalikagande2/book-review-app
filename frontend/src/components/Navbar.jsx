import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          BookReview
        </Link>
        <div className="d-flex align-items-center">
          <Link to="/" className="nav-link text-light me-3">Home</Link>
          {user ? (
            <>
              <span className="navbar-text me-3">Welcome, {user.name}!</span>
              <Link to="/add-book" className="nav-link text-light me-3">Add Book</Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link text-light me-3">Login</Link>
              <Link to="/signup" className="nav-link text-light">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;