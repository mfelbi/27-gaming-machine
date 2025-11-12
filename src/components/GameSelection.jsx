// src/components/GameSelection.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameSelection = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'game-selection';
    return () => {
      document.body.className = '';
    };
  }, []);

  const handleGameSelect = (gameType) => {
    navigate(`/game/${gameType}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar?');
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-5">
            <div className="welcome-header">
              <div className="floating-emojis">
                <span className="emoji" style={{ '--delay': '0s' }}>🎮</span>
                <span className="emoji" style={{ '--delay': '0.5s' }}>🎯</span>
                <span className="emoji" style={{ '--delay': '1s' }}>🎰</span>
                <span className="emoji" style={{ '--delay': '1.5s' }}>🎲</span>
                <span className="emoji" style={{ '--delay': '2s' }}>🏆</span>
              </div>
              <h1 className="display-4 fw-bold text-primary mb-3">
                Selamat Datang, {username}! 🎮
              </h1>
              <p className="lead text-welcome">
                Pilih permainan favorit Anda dan raih kemenangan!
              </p>
              <div className="sparkle-container"></div>
            </div>
          </div>

          <div className="row g-4">
            {/* Game Spin Card */}
            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100 game-card border-0 shadow-lg"
                onClick={() => handleGameSelect('spin')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-3">
                  <div className="game-icon mb-2">
                    <span style={{ fontSize: '3rem' }}>🎰</span>
                  </div>
                  <h5 className="card-title text-primary mb-2">Spin Gembira</h5>
                  <p className="card-text text-muted small">
                    Mesin slot klasik dengan hadiah menarik
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-success p-1">
                      <i className="bi bi-star-fill"></i> Populer
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 text-center py-2">
                  <button className="btn btn-primary btn-sm">
                    Mainkan
                  </button>
                </div>
              </div>
            </div>

            {/* Game Roulette Card */}
            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100 game-card border-0 shadow-lg"
                onClick={() => handleGameSelect('roulette')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-3">
                  <div className="game-icon mb-2">
                    <span style={{ fontSize: '3rem' }}>🎯</span>
                  </div>
                  <h5 className="card-title text-danger mb-2">Roulette</h5>
                  <p className="card-text text-muted small">
                    Roda berputar dengan pilihan angka & warna
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-warning p-1">
                      <i className="bi bi-lightning-fill"></i> Seru
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 text-center py-2">
                  <button className="btn btn-danger btn-sm">
                    Mainkan
                  </button>
                </div>
              </div>
            </div>

            {/* Game Coin Flip Card */}
            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100 game-card border-0 shadow-lg"
                onClick={() => handleGameSelect('coinflip')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-3">
                  <div className="game-icon mb-2">
                    <span style={{ fontSize: '3rem' }}>🪙</span>
                  </div>
                  <h5 className="card-title text-warning mb-2">Coin Flip</h5>
                  <p className="card-text text-muted small">
                    Tebak sisi koin 50/50 chance
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-info p-1">
                      <i className="bi bi-lightning-fill"></i> Cepat
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 text-center py-2">
                  <button className="btn btn-warning btn-sm">
                    Mainkan
                  </button>
                </div>
              </div>
            </div>

            {/* Game Dice Duel Card */}
            <div className="col-md-6 col-lg-3">
              <div
                className="card h-100 game-card border-0 shadow-lg"
                onClick={() => handleGameSelect('dice')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center p-3">
                  <div className="game-icon mb-2">
                    <span style={{ fontSize: '3rem' }}>🎲</span>
                  </div>
                  <h5 className="card-title text-success mb-2">Dice Duel</h5>
                  <p className="card-text text-muted small">
                    Adu dadu melawan komputer
                  </p>
                  <div className="mt-2">
                    <span className="badge bg-danger p-1">
                      <i className="bi bi-fire"></i> Baru
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 text-center py-2">
                  <button className="btn btn-success btn-sm">
                    Mainkan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <div className="branding-section mb-4">
              <p className="branding-text">
                Build by GuyGuy Gaming
              </p>
            </div>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={handleLogout}
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-card {
          transition: all 0.3s ease;
          border-radius: 15px;
        }

        .game-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }

        .game-icon {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .card-title {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn {
          border-radius: 50px;
          padding: 12px 30px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .branding-section {
          animation: fadeInUp 1s ease-out;
        }

        .branding-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #FFD700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          background: linear-gradient(45deg, #FFD700, #FFA500);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          padding: 10px;
          border-radius: 10px;
          animation: brandingGlow 2s ease-in-out infinite;
        }

        @keyframes brandingGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.9));
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GameSelection;