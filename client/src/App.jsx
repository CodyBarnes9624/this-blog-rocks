import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import Login from './pages/Login.jsx';  
import ProtectedPage from './pages/ProtectedPage.jsx'; 
import NotFound from './components/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute'; 
import { getToken } from './services/authService'; 

const App = () => {
  const isAuthenticated = !!getToken();  

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/login" component={Login} />
        
        {/* Protected route */}
        <ProtectedRoute path="/protected" component={ProtectedPage} isAuthenticated={isAuthenticated} />

        {/* Redirect to 404 page for unknown routes */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
