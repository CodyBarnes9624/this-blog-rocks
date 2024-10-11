// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/login">Login</Link> {/* Link to Login */}
        <Link to="/register">Register</Link> {/* Link to Register */}
      </nav>
    </header>
  );
};

export default Header;

