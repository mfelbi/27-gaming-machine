// src/components/RouletteGame.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RouletteAnimation.css';
import GameLoader from './GameLoader';

const RouletteGame = ({ username }) => {
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
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [betType, setBetType] = useState(''); // 'number', 'color', 'oddeven'
  const [betValue, setBetValue] = useState(''); // nomor, warna, atau odd/even
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [winMessage, setWinMessage] = useState('');
  const [loseMessage, setLoseMessage] = useState('');
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Angka-angka roulette European standar dengan urutan searah jarum jam
  const rouletteNumbers = [
    { number: 0, color: 'green' },
    { number: 32, color: 'red' }, { number: 15, color: 'black' }, { number: 19, color: 'red' },
    { number: 4, color: 'black' }, { number: 21, color: 'red' }, { number: 2, color: 'black' },
    { number: 25, color: 'red' }, { number: 17, color: 'black' }, { number: 34, color: 'red' },
    { number: 6, color: 'black' }, { number: 27, color: 'red' }, { number: 13, color: 'black' },
    { number: 36, color: 'red' }, { number: 11, color: 'black' }, { number: 30, color: 'red' },
    { number: 8, color: 'black' }, { number: 23, color: 'red' }, { number: 10, color: 'black' },
    { number: 5, color: 'red' }, { number: 24, color: 'black' }, { number: 16, color: 'red' },
    { number: 33, color: 'black' }, { number: 1, color: 'red' }, { number: 20, color: 'black' },
    { number: 14, color: 'red' }, { number: 31, color: 'black' }, { number: 9, color: 'red' },
    { number: 22, color: 'black' }, { number: 18, color: 'red' }, { number: 29, color: 'black' },
    { number: 7, color: 'red' }, { number: 28, color: 'black' }, { number: 12, color: 'red' },
    { number: 35, color: 'black' }, { number: 3, color: 'red' }, { number: 26, color: 'black' }
  ];

  const numbers = Array.from({ length: 36 }, (_, i) => i + 1);

  const handleBuyCoins = (amount) => {
    if (amount >= 5 && amount <= 20) {
      setCoins(coins + amount);
      setWinMessage('');
      setLoseMessage('');
    } else {
      alert('You can buy between 5 and 20 coins.');
    }
  };

  const handleBet = () => {
    if (coins < betAmount) {
      alert('Not enough coins!');
      return;
    }

    if (!betType || !betValue) {
      alert('Please select your bet!');
      return;
    }

    setIsSpinning(true);
    setWinMessage('');
    setLoseMessage('');
    setResult(null); // Clear previous result
    setCoins(coins - betAmount);

    // Generate random result
    const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const selectedNumber = rouletteNumbers[randomIndex];

    // Calculate rotation to land on the selected number
    // Each number takes 360/37 degrees = 9.73 degrees
    const degreesPerNumber = 360 / rouletteNumbers.length;
    // We want the selected number to be at the top (position 0)
    // So we rotate the wheel so that the selected number aligns with the pointer
    const targetAngle = -randomIndex * degreesPerNumber;
    const spins = 5; // Number of full rotations
    const newRotation = rotation + (spins * 360) + targetAngle;

    setRotation(newRotation);

    // Show result after spinning animation completes
    setTimeout(() => {
      setResult(selectedNumber);
      setHistory(prev => [selectedNumber, ...prev.slice(0, 9)]);
      checkWin(selectedNumber);
      setIsSpinning(false);
    }, 4000); // Match with CSS transition duration
  };

  const checkWin = (selectedNumber) => {
    let won = false;
    let winAmount = 0;

    if (betType === 'number' && parseInt(betValue) === selectedNumber.number) {
      won = true;
      winAmount = betAmount * 35; // 35:1 payout for single number
    } else if (betType === 'color' && betValue === selectedNumber.color) {
      won = true;
      winAmount = betAmount * 2; // 1:1 payout for color
    } else if (betType === 'oddeven') {
      const isEven = selectedNumber.number !== 0 && selectedNumber.number % 2 === 0;
      if ((betValue === 'even' && isEven) || (betValue === 'odd' && !isEven)) {
        won = true;
        winAmount = betAmount * 2; // 1:1 payout for odd/even
      }
    }

    if (won) {
      setCoins(prev => prev + winAmount);
      setWinMessage(`🎉 You won ${winAmount} coins!`);
      setLoseMessage('');
    } else {
      setLoseMessage('😞 Better luck next time!');
      setWinMessage('');
    }
  };

  const handleBackToMenu = () => {
    const confirmBack = window.confirm('Apakah Anda yakin kembali ke menu utama?');
    if (confirmBack) {
      navigate('/game-selection');
    }
  };

  const clearBet = () => {
    setBetType('');
    setBetValue('');
  };

  if (isLoading) {
    return <GameLoader gameType="roulette" onComplete={handleLoadingComplete} />;
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
        <h3>Roulette</h3>

        {/* Roulette Wheel */}
        <div className="roulette-container mb-4">
          {/* Pointer */}
          <div className="roulette-pointer"></div>
          <div
            className="roulette-wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {rouletteNumbers.map((num, index) => {
              const angle = (index * 360 / rouletteNumbers.length) * Math.PI / 180;
              const isMobile = window.innerWidth <= 768;
              const radius = isMobile ? 155 : 205; // Jarak dari pusat ke nomor (mobile vs desktop)
              const x = Math.cos(angle - Math.PI / 2) * radius;
              const y = Math.sin(angle - Math.PI / 2) * radius;

              return (
                <div
                  key={index}
                  className={`roulette-number ${num.color}`}
                  data-number={num.number}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? '-17.5px' : '-20px',
                    marginTop: isMobile ? '-17.5px' : '-20px'
                  }}
                >
                  <span>{num.number}</span>
                </div>
              );
            })}
          </div>
          <div className="roulette-center"></div>
          <div className="roulette-ball" style={{
            opacity: isSpinning ? 1 : 0,
            transform: isSpinning ? 'translateX(-50%)' : 'translateX(-50%) translateY(-20px)'
          }}></div>
        </div>

        </div>

        {/* Result Display - Show after spinning completes */}
        {result && !isSpinning && (
          <div className="result-display mb-4 animate__animated animate__fadeIn">
            <h4 className="mb-3">
              🎯 <strong>Result:</strong>
              <span className={`badge ms-2 fs-6 ${result.color === 'red' ? 'bg-danger' : result.color === 'black' ? 'bg-dark' : 'bg-success'}`}>
                {result.number} {result.color.toUpperCase()}
              </span>
            </h4>
            <div className="result-highlight">
              <p className="mb-0">The wheel stopped at <strong>Number {result.number}</strong> ({result.color.toUpperCase()})</p>
            </div>
          </div>
        )}

      {winMessage && <div className="alert alert-success">{winMessage}</div>}
      {loseMessage && <div className="alert alert-danger">{loseMessage}</div>}

      {/* Betting Section */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5>Place Your Bet</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>Bet Amount:</label>
                  <select
                    className="form-select"
                    value={betAmount}
                    onChange={(e) => setBetAmount(parseInt(e.target.value))}
                    disabled={isSpinning}
                  >
                    <option value={1}>1 Coin</option>
                    <option value={2}>2 Coins</option>
                    <option value={5}>5 Coins</option>
                  </select>
                </div>
                <div className="col-md-8">
                  <label>Bet Type:</label>
                  <div className="btn-group w-100" role="group">
                    <button
                      className={`btn ${betType === 'color' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => { setBetType('color'); setBetValue(''); }}
                      disabled={isSpinning}
                    >
                      Color
                    </button>
                    <button
                      className={`btn ${betType === 'number' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => { setBetType('number'); setBetValue(''); }}
                      disabled={isSpinning}
                    >
                      Number
                    </button>
                    <button
                      className={`btn ${betType === 'oddeven' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => { setBetType('oddeven'); setBetValue(''); }}
                      disabled={isSpinning}
                    >
                      Odd/Even
                    </button>
                  </div>
                </div>
              </div>

              {/* Bet Selection */}
              {betType === 'color' && (
                <div className="mb-3">
                  <label>Choose Color:</label>
                  <div className="btn-group w-100">
                    <button
                      className={`btn btn-danger ${betValue === 'red' ? 'active' : ''}`}
                      onClick={() => setBetValue('red')}
                      disabled={isSpinning}
                    >
                      Red
                    </button>
                    <button
                      className={`btn btn-dark ${betValue === 'black' ? 'active' : ''}`}
                      onClick={() => setBetValue('black')}
                      disabled={isSpinning}
                    >
                      Black
                    </button>
                  </div>
                </div>
              )}

              {betType === 'number' && (
                <div className="mb-3">
                  <label>Choose Number (0-36):</label>
                  <div className="grid-numbers">
                    {[0, ...numbers].map(num => (
                      <button
                        key={num}
                        className={`btn btn-sm ${num === 0 ? 'btn-success' : numbers.slice(0, 18).includes(num) ? 'btn-danger' : 'btn-dark'} ${betValue == num ? 'active' : ''}`}
                        onClick={() => setBetValue(num.toString())}
                        disabled={isSpinning}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {betType === 'oddeven' && (
                <div className="mb-3">
                  <label>Choose:</label>
                  <div className="btn-group w-100">
                    <button
                      className={`btn btn-warning ${betValue === 'odd' ? 'active' : ''}`}
                      onClick={() => setBetValue('odd')}
                      disabled={isSpinning}
                    >
                      Odd
                    </button>
                    <button
                      className={`btn btn-info ${betValue === 'even' ? 'active' : ''}`}
                      onClick={() => setBetValue('even')}
                      disabled={isSpinning}
                    >
                      Even
                    </button>
                  </div>
                </div>
              )}

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success flex-grow-1"
                  onClick={handleBet}
                  disabled={isSpinning || coins < betAmount || !betValue}
                >
                  {isSpinning ? 'Spinning...' : 'Spin'}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={clearBet}
                  disabled={isSpinning}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="text-center mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide' : 'Show'} History
          </button>
          {showHistory && (
            <div className="mt-3">
              <h5>Last 10 Results:</h5>
              <div className="d-flex justify-content-center flex-wrap gap-2">
                {history.map((num, index) => (
                  <span
                    key={index}
                    className={`badge ${num.color === 'red' ? 'bg-danger' : num.color === 'black' ? 'bg-dark' : 'bg-success'}`}
                  >
                    {num.number}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouletteGame;