import React from 'react';
import { historyManager } from '../utils/historyManager';

const HistoryModal = ({ isOpen, onClose }) => {
  const recentPlayers = historyManager.getRecentPlayers();
  const stats = historyManager.getHistoryStats();

  if (!isOpen) return null;

  return (
    <div
      className="history-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div
        className="history-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#2c3e50',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '2px solid #ffd700',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{
            color: '#ffd700',
            margin: '0 0 10px 0',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            📜 History Pemain
          </h2>
          <div style={{
            color: '#ecf0f1',
            fontSize: '0.9rem',
            marginBottom: '15px'
          }}>
            <div>Total pemain: <span style={{ color: '#3498db', fontWeight: 'bold' }}>{stats.totalPlayers}</span></div>
            <div>Reset setiap 24 jam (terakhir {stats.timeAgo})</div>
          </div>
        </div>

        {/* History List */}
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '15px',
          padding: '20px',
          maxHeight: '50vh',
          overflowY: 'auto',
          marginBottom: '20px'
        }}>
          {recentPlayers.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#95a5a6',
              padding: '40px 20px',
              fontSize: '1.1rem'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎮</div>
              Belum ada pemain yang bergabung dalam 24 jam terakhir
            </div>
          ) : (
            <div>
              {recentPlayers.map((player, index) => (
                <div
                  key={`${player.username}-${player.timestamp}`}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,215,0,0.1)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = index % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      color: '#ffd700',
                      marginRight: '10px',
                      fontSize: '1.2rem'
                    }}>
                      👤
                    </span>
                    <span style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    }}>
                      {player.username}
                    </span>
                  </div>
                  <div style={{
                    color: '#bdc3c7',
                    fontSize: '0.85rem',
                    textAlign: 'right'
                  }}>
                    {player.displayTime}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#c0392b';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#e74c3c';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;