// App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('blog')}>Blog</button>
      </nav>
      <div>
        {currentPage === 'home' && <Home />}
        {currentPage === 'blog' && <Blog />}
      </div>
    </div>
  );
};

export default App;