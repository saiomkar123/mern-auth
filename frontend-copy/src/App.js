import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to ="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
