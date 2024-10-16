import './App.css';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom
import Header from './components/Header'; 

function App() {
  return (
    <div className="App">
      <Header /> {}
      <Outlet /> {/* This is where nested routes will render */}
    </div>
  );
}

export default App;