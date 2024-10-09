import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './utils/API';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog/:id?" component={Blog} /> {/* Supports blog post IDs */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} /> {/* For unmatched routes */}
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
