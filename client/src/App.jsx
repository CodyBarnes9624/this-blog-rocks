// App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'blog':
        return <Blog />;
      default:
        return <h1>Page Not Found</h1>; // Default case for unknown pages
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('blog')}>Blog</button>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};

export default App;