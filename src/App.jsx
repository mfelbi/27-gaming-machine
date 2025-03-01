// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputUsername from './components/InputUsername';
import HomeSlot from './components/HomeSlot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputUsername setUsername={setUsername} />} />
        <Route path="/home" element={<HomeSlot username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
