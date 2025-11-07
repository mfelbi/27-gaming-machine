// src/components/InputUsername.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { historyManager } from '../utils/historyManager';

const InputUsername = ({ setUsername }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Save to history
      historyManager.addPlayer(name.trim());
      setUsername(name);
      navigate('/home');
    } else {
      alert('Please enter a name');
    }
  };

  return (
    <div className="input-username-container">
      <div className="game-title">
        <h1>Haji Mbi Gaming </h1>
      </div>
      <form className="username-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="username-label">Masukan Nama Kamu: </label>
        <input
          type="text"
          id="username"
          className="username-input"
          value={name}
          onChange={handleInputChange}
          placeholder="Ex Mbi"
          required
        />
        <button type="submit" className="start-game-btn">Mulai Game</button>
      </form>
    </div>
  );
};

export default InputUsername;
