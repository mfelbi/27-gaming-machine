// src/components/HomeSlot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomeSlot = ({ username }) => {
  const [coins, setCoins] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [spinResult, setSpinResult] = useState(['♠️', '♥️', '♦️', '♣️', '🃏']); // Default value for spinResult
  const [maxCoins, setMaxCoins] = useState(10);  // Max 10 coins
  const [winMessage, setWinMessage] = useState(''); // State to store win message
  const [failureMessage, setFailureMessage] = useState(''); // State for failure message
  const [winSpin, setWinSpin] = useState(0);  // Randomized spin to win
  const [gameEnded, setGameEnded] = useState(false);  // Flag to check if the game ended after winning
  const items = ['♠️', '♥️', '♦️', '♣️', '🃏'];

  const navigate = useNavigate();  // Initialize navigate

  // Function to buy coins (either 5 or 10)
  const handleBuyCoins = (amount) => {
    if (coins + amount > maxCoins) {
      alert('You can only have up to 10 coins.');
      return;
    }

    if (amount >= 5 && amount <= 10) {
      setCoins(coins + amount);
      setSpinCount(0);  // Reset spin count after buying coins
      setWinMessage('');  // Reset win message when buying coins
      setFailureMessage('');  // Reset failure message when buying coins
      setGameEnded(false);  // Reset gameEnded when buying coins
      // Randomly set a spin between 10 and 20 for victory
      setWinSpin(Math.floor(Math.random() * 11) + 10);
    } else {
      alert('You can buy between 5 and 10 coins.');
    }
  };

  // Handle spinning the slot machine
  const handleSpin = () => {
    if (coins <= 0) {
      alert('Not enough coins to spin. Please buy more coins.');
      return;
    }

    setCoins(coins - 1);  // Deduct 1 coin for each spin
    setSpinCount(spinCount + 1);  // Increase spin count

    // Check for win if the current spin matches the win spin
    if (spinCount + 1 === winSpin) {
      setSpinResult(['♥️', '♥️', '♥️', '♥️', '♥️']); // Set all items to be the same (winning state)
      setWinMessage('Congratulations! You win! 🎉');  // Display win message when reaching the winning spin
      setFailureMessage('');  // Clear failure message when win occurs
      setGameEnded(true); // Mark that the game ended after win
    } else {
      // Generate random spin result when not winning
      const result = Array(5)
        .fill(null)
        .map(() => items[Math.floor(Math.random() * items.length)]);

      setSpinResult(result); // Set the random result
      setFailureMessage('Try Again! 😞');  // Show failure message if not winning
    }
  };

  const handleExitGame = () => {
    const confirmExit = window.confirm('Apakah Anda yakin ingin keluar?');
    if (confirmExit) {
      navigate('/');  // Navigate back to the home screen (InputUsername)
    }
  };

  const handleContinuePlaying = () => {
    const continuePlaying = window.confirm('Kamu sudah Menang, apa kamu ingin lanjut?');
    if (continuePlaying) {
      setGameEnded(false);  // Allow the user to continue
      setSpinCount(0);  // Reset spin count to continue
    } else {
      setGameEnded(false);  // Optionally, reset everything to default if the user decides not to continue
      setWinMessage('');  // Reset win message
      setFailureMessage('');  // Reset failure message
      setCoins(0);  // Optionally, reset coin count (or leave as is)
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Hi {username}, raihlah kemenanganmu!</h1>

      <div className="d-flex justify-content-center mb-4">
        <h2>Coins Kamu: {coins}</h2>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success mr-3" onClick={() => handleBuyCoins(5)}>5 Coins</button>
        <button className="btn btn-success" onClick={() => handleBuyCoins(10)}>10 Coins</button>
      </div>

      <div className="text-center mb-4">
        <h3>Spin Gembira</h3>
        {/* Kotak untuk mesin slot */}
        <div className="slot-box d-flex justify-content-center mb-4">
          <div className="slot-items d-flex">
            {spinResult.map((item, index) => (
              <span key={index} className="slot-item mx-2">{item}</span>
            ))}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSpin} disabled={gameEnded}>Spin</button> {/* Disable Spin if the game ended */}
        <p className="mt-2">Jumlah Spins: {coins}</p>

        {/* Display win message */}
        {winMessage && <p className="text-success">{winMessage}</p>}
        {/* Display failure message */}
        {failureMessage && <p className="text-danger">{failureMessage}</p>}

        {/* Ask if the player wants to continue after winning */}
        {gameEnded && (
          <div className="mt-4">
            <button className="btn btn-info" onClick={handleContinuePlaying}>Continue Playing</button>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleExitGame}>Keluar</button>
      </div>
    </div>
  );
};

export default HomeSlot;
