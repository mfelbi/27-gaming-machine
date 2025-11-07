// History Manager untuk menyimpan nama pemain
export class HistoryManager {
  constructor() {
    this.storageKey = 'slotGameHistory';
    this.initHistory();
  }

  initHistory() {
    const history = this.getHistory();
    if (!history || !history.lastReset) {
      this.resetHistory();
    } else {
      this.checkAndResetIfNeeded();
    }
  }

  getHistory() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : { players: [], lastReset: null };
    } catch (error) {
      console.error('Error reading history:', error);
      return { players: [], lastReset: null };
    }
  }

  saveHistory(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  addPlayer(username) {
    const history = this.getHistory();
    this.checkAndResetIfNeeded();

    const now = new Date();
    const playerEntry = {
      username: username,
      timestamp: now.toISOString(),
      displayTime: this.formatDateTime(now)
    };

    history.players.unshift(playerEntry); // Add to beginning
    this.saveHistory(history);
  }

  formatDateTime(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`;
  }

  checkAndResetIfNeeded() {
    const history = this.getHistory();
    if (!history.lastReset) {
      this.resetHistory();
      return;
    }

    const lastReset = new Date(history.lastReset);
    const now = new Date();
    const hoursDiff = (now - lastReset) / (1000 * 60 * 60);

    if (hoursDiff >= 24) {
      this.resetHistory();
    }
  }

  resetHistory() {
    const newHistory = {
      players: [],
      lastReset: new Date().toISOString()
    };
    this.saveHistory(newHistory);
  }

  getRecentPlayers(limit = 50) {
    const history = this.getHistory();
    this.checkAndResetIfNeeded();
    return history.players.slice(0, limit);
  }

  getHistoryStats() {
    const history = this.getHistory();
    this.checkAndResetIfNeeded();

    const lastReset = history.lastReset ? new Date(history.lastReset) : new Date();
    const now = new Date();
    const hoursAgo = Math.floor((now - lastReset) / (1000 * 60 * 60));
    const minutesAgo = Math.floor((now - lastReset) / (1000 * 60)) % 60;

    return {
      totalPlayers: history.players.length,
      lastReset: lastReset,
      timeAgo: hoursAgo > 0 ? `${hoursAgo} jam ${minutesAgo} menit lalu` : `${minutesAgo} menit lalu`
    };
  }
}

// Export singleton instance
export const historyManager = new HistoryManager();