// src/components/GameLoader.jsx
import React, { useState, useEffect } from 'react';
import './GameLoader.css';

const GameLoader = ({ gameType, onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const renderLoadingContent = () => {
    switch (gameType) {
      case 'spin':
        return <SpinLoadingAnimation progress={loadingProgress} />;
      case 'roulette':
        return <RouletteLoadingAnimation progress={loadingProgress} />;
      case 'coinflip':
        return <CoinFlipLoadingAnimation progress={loadingProgress} />;
      case 'dice':
        return <DiceLoadingAnimation progress={loadingProgress} />;
      default:
        return <DefaultLoadingAnimation progress={loadingProgress} />;
    }
  };

  if (!showContent) return null;

  return (
    <div className="game-loader-overlay">
      <div className="game-loader-content">
        <div className="branding-text">Build by GuyGuy Gaming</div>
        {renderLoadingContent()}
      </div>
    </div>
  );
};

const SpinLoadingAnimation = ({ progress }) => {
  const [reels, setReels] = useState(['♠️', '♥️', '♦️', '♣️', '🃏']);
  const slotSymbols = ['♠️', '♥️', '♦️', '♣️', '🃏', '⭐', '💎', '🔔'];

  useEffect(() => {
    const interval = setInterval(() => {
      setReels(prev =>
        prev.map(() => slotSymbols[Math.floor(Math.random() * slotSymbols.length)])
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spin-loader">
      <h2 className="loader-title">🎰 Memuat Spin Gembira...</h2>
      <div className="loading-reels">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className="loading-reel"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {symbol}
          </div>
        ))}
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill spin-progress"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <div className="loading-messages">
        <p className="loading-message">🎯 Menyiapkan mesin slot...</p>
        <p className="loading-message">💰 Mengatur hadiah jackpot...</p>
        <p className="loading-message">🎉 Mengaktifkan mode keberuntungan...</p>
      </div>
    </div>
  );
};

const RouletteLoadingAnimation = ({ progress }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [ballPosition, setBallPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBallPosition(prev => (prev + 30) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="roulette-loader">
      <h2 className="loader-title">🎯 Memuat Roulette...</h2>
      <div className="roulette-wheel-container">
        <div className="mini-roulette-wheel">
          <div
            className="mini-wheel-inner"
            style={{ transform: `rotate(${ballPosition}deg)` }}
          >
            <div className="wheel-segment red"></div>
            <div className="wheel-segment black"></div>
            <div className="wheel-segment green"></div>
            <div className="wheel-segment red"></div>
            <div className="wheel-segment black"></div>
            <div className="wheel-segment green"></div>
          </div>
          <div className="mini-ball"></div>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill roulette-progress"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <div className="loading-messages">
        <p className="loading-message">🎰 Menyiapkan roda roulette...</p>
        <p className="loading-message">🔢 Mengatur angka keberuntungan...</p>
        <p className="loading-message">💎 Menghitung peluang menang...</p>
      </div>
    </div>
  );
};

const CoinFlipLoadingAnimation = ({ progress }) => {
  const [isFlipping, setIsFlipping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(prev => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="coinflip-loader">
      <h2 className="loader-title">🪙 Memuat Coin Flip...</h2>
      <div className="loading-coin-container">
        <div className={`loading-coin ${isFlipping ? 'flip' : ''}`}>
          <div className="loading-coin-side heads">
            <span className="loading-coin-icon">👑</span>
          </div>
          <div className="loading-coin-side tails">
            <span className="loading-coin-icon">🦅</span>
          </div>
        </div>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill coinflip-progress"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <div className="loading-messages">
        <p className="loading-message">🪙 Menyiapkan koin emas...</p>
        <p className="loading-message">🎯 Mengatur peluang 50/50...</p>
        <p className="loading-message">💰 Mengaktifkan mode keberuntungan...</p>
      </div>
    </div>
  );
};

const DiceLoadingAnimation = ({ progress }) => {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiceValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dice-loader">
      <h2 className="loader-title">🎲 Memuat Dice Duel...</h2>
      <div className="loading-dice-container">
        {diceValues.map((value, index) => (
          <div
            key={index}
            className="loading-die"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="loading-die-face">
              {Array.from({ length: value }, (_, i) => (
                <div key={i} className="loading-die-dot"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill dice-progress"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <div className="loading-messages">
        <p className="loading-message">🎲 Menyiapkan dadu profesional...</p>
        <p className="loading-message">⚔️ Memanggil lawan komputer...</p>
        <p className="loading-message">🏆 Mengatur arena pertarungan...</p>
      </div>
    </div>
  );
};

const DefaultLoadingAnimation = ({ progress }) => {
  return (
    <div className="default-loader">
      <h2 className="loader-title">🎮 Memuat Game...</h2>
      <div className="loading-dice">
        <span className="dice dice-1">🎲</span>
        <span className="dice dice-2">🎯</span>
        <span className="dice dice-3">🎰</span>
      </div>
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill default-progress"
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoader;