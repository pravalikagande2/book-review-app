import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import BookDetailsPage from './pages/BookDetailsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';

function App() {
 return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/books/edit/:id" element={<EditBookPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
export default App;