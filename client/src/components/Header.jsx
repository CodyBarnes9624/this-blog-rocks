import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Music Blog</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </nav>
    </header>
  );
};

export default Header;
