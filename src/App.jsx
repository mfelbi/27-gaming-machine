// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputUsername from './components/InputUsername';
import GameSelection from './components/GameSelection';
import SpinGame from './components/SpinGame';
import RouletteGame from './components/RouletteGame';
import CoinFlipGame from './components/CoinFlipGame';
import DiceDuelGame from './components/DiceDuelGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputUsername setUsername={setUsername} />} />
        <Route path="/game-selection" element={<GameSelection username={username} />} />
        <Route path="/game/spin" element={<SpinGame username={username} />} />
        <Route path="/game/roulette" element={<RouletteGame username={username} />} />
        <Route path="/game/coinflip" element={<CoinFlipGame username={username} />} />
        <Route path="/game/dice" element={<DiceDuelGame username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
