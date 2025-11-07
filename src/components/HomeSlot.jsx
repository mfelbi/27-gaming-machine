// src/components/HomeSlot.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SlotAnimation.css'; // Import animasi CSS
import HistoryModal from './HistoryModal'; // Import HistoryModal

const HomeSlot = ({ username }) => {
  const [coins, setCoins] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [spinResult, setSpinResult] = useState(['♠️', '♥️', '♦️', '♣️', '🃏']); // Default value for spinResult
  const [maxCoins, setMaxCoins] = useState(10);  // Max 10 coins
  const [winMessage, setWinMessage] = useState(''); // State to store win message
  const [failureMessage, setFailureMessage] = useState(''); // State for failure message
  const [winSpin, setWinSpin] = useState(0);  // Randomized spin to win
  const [gameEnded, setGameEnded] = useState(false);  // Flag to check if the game ended after winning
  const [isSpinning, setIsSpinning] = useState(false);  // State untuk animasi spin
  const [spinningReels, setSpinningReels] = useState([false, false, false, false, false]); // State per reel
  const [leverPulled, setLeverPulled] = useState(false); // State untuk animasi tuas
  const [showHistoryModal, setShowHistoryModal] = useState(false); // State untuk history modal
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
      setIsSpinning(false);  // Reset spinning state
      setSpinningReels([false, false, false, false, false]); // Reset spinning reels
      setLeverPulled(false); // Reset lever state
      // Randomly set a spin between 10 and 20 for victory
      setWinSpin(Math.floor(Math.random() * 11) + 10);
    } else {
      alert('You can buy between 5 and 10 coins.');
    }
  };

  // Handle spinning the slot machine
  const handleSpin = () => {
    if (coins <= 0 || isSpinning) {
      alert('Not enough coins to spin or currently spinning. Please buy more coins or wait.');
      return;
    }

    triggerSpin();
  };

  // Function to trigger spin with lever animation
  const triggerSpin = () => {
    setCoins(coins - 1);  // Deduct 1 coin for each spin
    setSpinCount(spinCount + 1);  // Increase spin count
    setIsSpinning(true);
    setLeverPulled(true);
    setWinMessage('');
    setFailureMessage('');

    // Start spinning animation for all reels
    setSpinningReels([true, true, true, true, true]);

    // Determine the result
    const isWin = spinCount + 1 === winSpin;
    let finalResult;

    if (isWin) {
      finalResult = ['♥️', '♥️', '♥️', '♥️', '♥️']; // Winning state
    } else {
      // Generate random spin result
      finalResult = Array(5)
        .fill(null)
        .map(() => items[Math.floor(Math.random() * items.length)]);
    }

    // Stop reels one by one with delay
    const stopDelays = [800, 1000, 1200, 1400, 1600]; // Staggered stopping

    stopDelays.forEach((delay, index) => {
      setTimeout(() => {
        setSpinningReels(prev => {
          const newSpinning = [...prev];
          newSpinning[index] = false;
          return newSpinning;
        });

        // Show the final result for this reel
        setSpinResult(prev => {
          const newResult = [...prev];
          newResult[index] = finalResult[index];
          return newResult;
        });

        // Check if this is the last reel
        if (index === 4) {
          setTimeout(() => {
            setIsSpinning(false);
            setLeverPulled(false);

            if (isWin) {
              setWinMessage('Congratulations! You win! 🎉');
              setFailureMessage('');
              setGameEnded(true);
            } else {
              setFailureMessage('Try Again! 😞');
            }
          }, 300); // Small delay after last reel stops
        }
      }, delay);
    });
  };

  // Handle lever click
  const handleLeverClick = () => {
    if (coins <= 0 || isSpinning || leverPulled) {
      return;
    }
    triggerSpin();
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
      setWinMessage('');  // Reset win message
      setFailureMessage('');  // Reset failure message
      setIsSpinning(false);  // Reset spinning state
      setSpinningReels([false, false, false, false, false]); // Reset spinning reels
      setLeverPulled(false); // Reset lever state
      // Randomly set a new win spin
      setWinSpin(Math.floor(Math.random() * 11) + 10);
    } else {
      setGameEnded(false);  // Optionally, reset everything to default if the user decides not to continue
      setWinMessage('');  // Reset win message
      setFailureMessage('');  // Reset failure message
      setCoins(0);  // Optionally, reset coin count (or leave as is)
      setIsSpinning(false);  // Reset spinning state
      setSpinningReels([false, false, false, false, false]); // Reset spinning reels
      setLeverPulled(false); // Reset lever state
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
        <div className={`slot-box ${gameEnded && winMessage ? 'winner' : ''}`}>
          <div className="slot-machine-container">
            {/* Slot reels area */}
            <div className="slot-reels-area">
              <div className="slot-items d-flex">
                {spinResult.map((item, index) => {
                  let itemClass = 'slot-item mx-2';

                  if (spinningReels[index]) {
                    itemClass += ' spinning';
                  } else if (isSpinning && !spinningReels[index]) {
                    itemClass += ' stopping';
                  }

                  if (gameEnded && winMessage) {
                    itemClass += ' winner';
                  }

                  return (
                    <span key={index} className={itemClass}>
                      {spinningReels[index] ? '?' : item}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Slot lever */}
            <div
              className="slot-lever-container"
              onClick={handleLeverClick}
              style={{
                cursor: coins > 0 && !isSpinning && !leverPulled ? 'pointer' : 'not-allowed',
                opacity: (coins > 0 && !isSpinning && !leverPulled) ? 1 : 0.5
              }}
            >
              <div className="slot-lever-base">
                <div className={`slot-lever-arm ${leverPulled ? 'pulled' : ''}`}>
                  <div className="slot-lever-handle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn-spin"
          onClick={handleSpin}
          disabled={gameEnded || isSpinning || coins <= 0}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
        <p className="mt-2">Jumlah Spins: {coins}</p>

        {/* Display win message */}
        {winMessage && <p className="win-message">{winMessage}</p>}
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
        <button
          className="btn btn-warning me-3"
          onClick={() => setShowHistoryModal(true)}
          style={{
            background: 'linear-gradient(145deg, #f39c12, #e67e22)',
            border: 'none',
            color: 'white',
            padding: '10px 25px',
            borderRadius: '25px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          📜 History
        </button>
        <button className="btn btn-danger" onClick={handleExitGame}>Keluar</button>
      </div>

      {/* History Modal */}
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </div>
  );
};

export default HomeSlot;
