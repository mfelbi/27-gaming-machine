// src/components/CoinFlipGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameLoader from './GameLoader';
import './CoinFlipAnimation.css';

const CoinFlipGame = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [selectedSide, setSelectedSide] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [flipHistory, setFlipHistory] = useState([]);
  const [winStreak, setWinStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'game-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleBuyCoins = (amount) => {
    if (amount >= 5 && amount <= 20) {
      setCoins(coins + amount);
    } else {
      alert('You can buy between 5 and 20 coins.');
    }
  };

  const flipCoin = () => {
    if (coins < betAmount || !selectedSide || isFlipping) {
      if (coins < betAmount) {
        alert('Not enough coins!');
      } else if (!selectedSide) {
        alert('Please select heads or tails!');
      }
      return;
    }

    setIsFlipping(true);
    setShowResult(false);
    setCoins(coins - betAmount);

    // Simulate coin flip animation
    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
      const won = coinResult === selectedSide;

      setResult(coinResult);
      setFlipHistory(prev => [coinResult, ...prev.slice(0, 9)]);

      if (won) {
        setCoins(prev => prev + (betAmount * 2));
        setWinStreak(prev => prev + 1);
      } else {
        setWinStreak(0);
      }

      setIsFlipping(false);
      setShowResult(true);
    }, 2000);
  };

  const handleBackToMenu = () => {
    const confirmBack = window.confirm('Apakah Anda yakin kembali ke menu utama?');
    if (confirmBack) {
      navigate('/game-selection');
    }
  };

  if (isLoading) {
    return <GameLoader gameType="coinflip" onComplete={handleLoadingComplete} />;
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
          <h1 className="mb-2">Hi {username}, uji keberuntunganmu!</h1>
          <div className="branding-badge">GuyGuy Gaming</div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>

      <div className="d-flex justify-content-center mb-4">
        <h2>Coins Kamu: {coins}</h2>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success me-2" onClick={() => handleBuyCoins(5)}>5 Coins</button>
        <button className="btn btn-success" onClick={() => handleBuyCoins(10)}>10 Coins</button>
      </div>

      <div className="text-center mb-4">
        <h3>Coin Flip 🪙</h3>

        {/* Coin Display */}
        <div className="coin-container mb-4">
          <div className={`coin ${isFlipping ? 'flipping' : ''} ${result ? `show-${result}` : ''}`}>
            <div className="coin-side heads">
              <div className="coin-face">
                <div className="coin-text">HEADS</div>
                <div className="coin-icon">👑</div>
              </div>
            </div>
            <div className="coin-side tails">
              <div className="coin-face">
                <div className="coin-text">TAILS</div>
                <div className="coin-icon">🦅</div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {showResult && (
          <div className={`result-display mb-4 ${result === selectedSide ? 'win' : 'lose'}`}>
            <h4>
              {result === selectedSide ? '🎉 YOU WIN!' : '😞 YOU LOSE!'}
            </h4>
            <p>Result: <strong>{result.toUpperCase()}</strong></p>
            {result === selectedSide && (
              <p className="win-amount">+{betAmount} coins!</p>
            )}
          </div>
        )}

        {/* Betting Section */}
        <div className="betting-section">
          <div className="row mb-4">
            <div className="col-md-6">
              <label>Bet Amount:</label>
              <select
                className="form-select"
                value={betAmount}
                onChange={(e) => setBetAmount(parseInt(e.target.value))}
                disabled={isFlipping}
              >
                <option value={1}>1 Coin</option>
                <option value={2}>2 Coins</option>
                <option value={5}>5 Coins</option>
                <option value={10}>10 Coins</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Win Streak: <span className="streak-badge">{winStreak}🔥</span></label>
              <div className="streak-progress">
                <div
                  className="streak-fill"
                  style={{ width: `${Math.min(winStreak * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Choose Your Side:</h5>
              <div className="coin-choices">
                <button
                  className={`coin-choice ${selectedSide === 'heads' ? 'selected' : ''}`}
                  onClick={() => setSelectedSide('heads')}
                  disabled={isFlipping}
                >
                  <div className="choice-icon">👑</div>
                  <div className="choice-text">HEADS</div>
                </button>
                <button
                  className={`coin-choice ${selectedSide === 'tails' ? 'selected' : ''}`}
                  onClick={() => setSelectedSide('tails')}
                  disabled={isFlipping}
                >
                  <div className="choice-icon">🦅</div>
                  <div className="choice-text">TAILS</div>
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-warning btn-lg flip-btn"
                onClick={flipCoin}
                disabled={isFlipping || coins < betAmount || !selectedSide}
              >
                {isFlipping ? 'Flipping...' : 'FLIP COIN'}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        {flipHistory.length > 0 && (
          <div className="history-section">
            <h5>Recent Flips:</h5>
            <div className="flip-history">
              {flipHistory.map((flip, index) => (
                <span
                  key={index}
                  className={`history-item ${flip}`}
                  title={flip}
                >
                  {flip === 'heads' ? '👑' : '🦅'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinFlipGame;