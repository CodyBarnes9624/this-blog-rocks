import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './components/Login'; 
import Register from './components/Register'; 

\

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />, // Uncomment if you want to use a NotFound component
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'blog', // Remove the leading slash for child routes
        element: <Blog />
      },
      {
        path: 'login', // Add the login route
        element: <Login />,
      },
      {
        path: 'register', // Add the register route
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);