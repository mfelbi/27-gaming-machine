// src/components/DiceDuelGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameLoader from './GameLoader';
import './DiceDuelAnimation.css';

const DiceDuelGame = ({ username }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [playerDice, setPlayerDice] = useState([1, 1]);
  const [computerDice, setComputerDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
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

  const rollDice = () => {
    if (coins < betAmount || isRolling) {
      if (coins < betAmount) {
        alert('Not enough coins!');
      }
      return;
    }

    setIsRolling(true);
    setShowResult(false);
    setCoins(coins - betAmount);

    // Animate dice rolling
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setPlayerDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      setComputerDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      rollCount++;

      if (rollCount >= 15) {
        clearInterval(rollInterval);

        // Final result
        const finalPlayerDice = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ];
        const finalComputerDice = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ];

        const playerTotal = finalPlayerDice.reduce((a, b) => a + b, 0);
        const computerTotal = finalComputerDice.reduce((a, b) => a + b, 0);

        let gameResult;
        if (playerTotal > computerTotal) {
          gameResult = 'win';
          setCoins(prev => prev + (betAmount * 2));
          setTotalWins(prev => prev + 1);
        } else if (playerTotal < computerTotal) {
          gameResult = 'lose';
          setTotalLosses(prev => prev + 1);
        } else {
          gameResult = 'tie';
          setCoins(prev => prev + betAmount); // Return bet on tie
        }

        setPlayerDice(finalPlayerDice);
        setComputerDice(finalComputerDice);
        setResult({
          player: finalPlayerDice,
          computer: finalComputerDice,
          playerTotal,
          computerTotal,
          result: gameResult
        });

        setGameHistory(prev => [{
          playerTotal,
          computerTotal,
          result: gameResult
        }, ...prev.slice(0, 9)]);

        setIsRolling(false);
        setShowResult(true);
      }
    }, 150);
  };

  const getDiceFace = (value) => {
    const dots = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [25, 75], [75, 25], [75, 75]],
      5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
      6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]]
    };
    return dots[value] || dots[1];
  };

  const handleBackToMenu = () => {
    const confirmBack = window.confirm('Apakah Anda yakin kembali ke menu utama?');
    if (confirmBack) {
      navigate('/game-selection');
    }
  };

  if (isLoading) {
    return <GameLoader gameType="dice" onComplete={handleLoadingComplete} />;
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
          <h1 className="mb-2">Hi {username}, adu dadu dengan komputer!</h1>
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
        <h3>Dice Duel 🎲</h3>

        {/* Game Stats */}
        <div className="game-stats mb-4">
          <div className="stat-item">
            <span className="stat-label">Wins:</span>
            <span className="stat-value wins">{totalWins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Losses:</span>
            <span className="stat-value losses">{totalLosses}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Win Rate:</span>
            <span className="stat-value">
              {totalWins + totalLosses > 0
                ? Math.round((totalWins / (totalWins + totalLosses)) * 100)
                : 0}%
            </span>
          </div>
        </div>

        {/* Dice Battle Area */}
        <div className="dice-battle-area">
          <div className="player-section">
            <h4>PLAYER</h4>
            <div className="dice-container">
              {playerDice.map((die, index) => (
                <div key={index} className={`dice ${isRolling ? 'rolling' : ''}`}>
                  <div className="dice-face">
                    {getDiceFace(die).map((dot, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="dice-dot"
                        style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="dice-total">
              Total: <span className="total-number">{playerDice.reduce((a, b) => a + b, 0)}</span>
            </div>
          </div>

          <div className="vs-section">
            <div className="vs-text">VS</div>
          </div>

          <div className="computer-section">
            <h4>COMPUTER</h4>
            <div className="dice-container">
              {computerDice.map((die, index) => (
                <div key={index} className={`dice ${isRolling ? 'rolling' : ''}`}>
                  <div className="dice-face">
                    {getDiceFace(die).map((dot, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="dice-dot"
                        style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="dice-total">
              Total: <span className="total-number">{computerDice.reduce((a, b) => a + b, 0)}</span>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {showResult && result && (
          <div className={`result-display mb-4 ${result.result}`}>
            <h4>
              {result.result === 'win' && '🎉 YOU WIN!'}
              {result.result === 'lose' && '😞 YOU LOSE!'}
              {result.result === 'tie' && '🤝 IT\'S A TIE!'}
            </h4>
            <p>
              Player: {result.playerTotal} vs Computer: {result.computerTotal}
            </p>
            {result.result === 'win' && (
              <p className="win-amount">+{betAmount} coins!</p>
            )}
            {result.result === 'tie' && (
              <p className="tie-amount">Bet returned!</p>
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
                disabled={isRolling}
              >
                <option value={1}>1 Coin</option>
                <option value={2}>2 Coins</option>
                <option value={5}>5 Coins</option>
                <option value={10}>10 Coins</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-danger btn-lg roll-btn"
                onClick={rollDice}
                disabled={isRolling || coins < betAmount}
              >
                {isRolling ? 'Rolling...' : 'ROLL DICE'}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        {gameHistory.length > 0 && (
          <div className="history-section">
            <h5>Recent Games:</h5>
            <div className="game-history">
              {gameHistory.map((game, index) => (
                <div key={index} className={`history-item ${game.result}`}>
                  <span className="history-scores">
                    P:{game.playerTotal} vs C:{game.computerTotal}
                  </span>
                  <span className="history-result">
                    {game.result === 'win' ? 'W' : game.result === 'lose' ? 'L' : 'T'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceDuelGame;