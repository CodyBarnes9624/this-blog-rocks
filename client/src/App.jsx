import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
