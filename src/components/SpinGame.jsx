// src/components/SpinGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SlotAnimation.css';
import HistoryModal from './HistoryModal';
import GameLoader from './GameLoader';

const SpinGame = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.className = 'game-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  const [coins, setCoins] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [spinResult, setSpinResult] = useState(['♠️', '♥️', '♦️', '♣️', '🃏']);
  const [maxCoins, setMaxCoins] = useState(10);
  const [winMessage, setWinMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [winSpin, setWinSpin] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningReels, setSpinningReels] = useState([false, false, false, false, false]);
  const [leverPulled, setLeverPulled] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const items = ['♠️', '♥️', '♦️', '♣️', '🃏'];

  const navigate = useNavigate();

  const handleBuyCoins = (amount) => {
    if (coins + amount > maxCoins) {
      alert('You can only have up to 10 coins.');
      return;
    }

    if (amount >= 5 && amount <= 10) {
      setCoins(coins + amount);
      setSpinCount(0);
      setWinMessage('');
      setFailureMessage('');
      setGameEnded(false);
      setIsSpinning(false);
      setSpinningReels([false, false, false, false, false]);
      setLeverPulled(false);
      setWinSpin(Math.floor(Math.random() * 11) + 10);
    } else {
      alert('You can buy between 5 and 10 coins.');
    }
  };

  const handleSpin = () => {
    if (coins <= 0 || isSpinning) {
      alert('Not enough coins to spin or currently spinning. Please buy more coins or wait.');
      return;
    }

    triggerSpin();
  };

  const triggerSpin = () => {
    setCoins(coins - 1);
    setSpinCount(spinCount + 1);
    setIsSpinning(true);
    setLeverPulled(true);
    setWinMessage('');
    setFailureMessage('');

    setSpinningReels([true, true, true, true, true]);

    const isWin = spinCount + 1 === winSpin;
    let finalResult;

    if (isWin) {
      finalResult = ['♥️', '♥️', '♥️', '♥️', '♥️'];
    } else {
      finalResult = Array(5)
        .fill(null)
        .map(() => items[Math.floor(Math.random() * items.length)]);
    }

    const stopDelays = [800, 1000, 1200, 1400, 1600];

    stopDelays.forEach((delay, index) => {
      setTimeout(() => {
        setSpinningReels(prev => {
          const newSpinning = [...prev];
          newSpinning[index] = false;
          return newSpinning;
        });

        setSpinResult(prev => {
          const newResult = [...prev];
          newResult[index] = finalResult[index];
          return newResult;
        });

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
          }, 300);
        }
      }, delay);
    });
  };

  const handleLeverClick = () => {
    if (coins <= 0 || isSpinning || leverPulled) {
      return;
    }
    triggerSpin();
  };

  const handleBackToMenu = () => {
    const confirmBack = window.confirm('Apakah Anda yakin kembali ke menu utama?');
    if (confirmBack) {
      navigate('/game-selection');
    }
  };

  const handleContinuePlaying = () => {
    const continuePlaying = window.confirm('Kamu sudah Menang, apa kamu ingin lanjut?');
    if (continuePlaying) {
      setGameEnded(false);
      setSpinCount(0);
      setWinMessage('');
      setFailureMessage('');
      setIsSpinning(false);
      setSpinningReels([false, false, false, false, false]);
      setLeverPulled(false);
      setWinSpin(Math.floor(Math.random() * 11) + 10);
    } else {
      setGameEnded(false);
      setWinMessage('');
      setFailureMessage('');
      setCoins(0);
      setIsSpinning(false);
      setSpinningReels([false, false, false, false, false]);
      setLeverPulled(false);
    }
  };

  if (isLoading) {
    return <GameLoader gameType="spin" onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="container mt-4">
      <div className="game-header mb-4">
      <div className="row align-items-center">
        <div className="col-md-3">
          <button className="btn btn-outline-secondary" onClick={handleBackToMenu}>
            ← Kembali ke Menu
          </button>
        </div>
        <div className="col-md-6 text-center">
          <h1 className="mb-2">Hi {username}, raihlah kemenanganmu!</h1>
          <div className="branding-badge">GuyGuy Gaming</div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>

      <div className="d-flex justify-content-center mb-4">
        <h2>Coins Kamu: {coins}</h2>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success mr-3" onClick={() => handleBuyCoins(5)}>5 Coins</button>
        <button className="btn btn-success" onClick={() => handleBuyCoins(10)}>10 Coins</button>
      </div>

      <div className="text-center mb-4">
        <h3>Spin Gembira</h3>
        <div className={`slot-box ${gameEnded && winMessage ? 'winner' : ''}`}>
          <div className="slot-machine-container">
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

        {winMessage && <p className="win-message">{winMessage}</p>}
        {failureMessage && <p className="text-danger">{failureMessage}</p>}

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
        <button className="btn btn-danger" onClick={handleBackToMenu}>Keluar</button>
      </div>

      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </div>
  );
};

export default SpinGame;