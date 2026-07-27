// List of all available timezones
const ALL_TIMEZONES = [
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'America/Anchorage',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/New_York',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'America/Buenos_Aires',
  'Asia/Bangkok',
  'Asia/Dubai',
  'Asia/Hong_Kong',
  'Asia/Jakarta',
  'Asia/Kolkata',
  'Asia/Manila',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Brisbane',
  'Australia/Melbourne',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Berlin',
  'Europe/Dublin',
  'Europe/Istanbul',
  'Europe/London',
  'Europe/Madrid',
  'Europe/Moscow',
  'Europe/Paris',
  'Europe/Rome',
  'Europe/Stockholm',
  'Europe/Zurich',
  'Pacific/Auckland',
  'Pacific/Fiji',
  'Pacific/Honolulu',
  'UTC'
];

class DigitalClock {
  constructor() {
    this.activeTzs = ['UTC', 'America/New_York', 'Europe/London'];
    this.init();
  }

  init() {
    this.cacheDOM();
    this.render();
    this.attachEventListeners();
    this.startClock();
  }

  cacheDOM() {
    this.clocksGrid = document.getElementById('clocksGrid');
    this.timezoneSearch = document.getElementById('timezoneSearch');
    this.addTimezonBtn = document.getElementById('addTimezonBtn');
    this.timezoneList = document.getElementById('timezoneList');
    this.presetBtns = document.querySelectorAll('.preset-btn');
  }

  attachEventListeners() {
    this.addTimezonBtn.addEventListener('click', () => this.handleAddTimezone());
    this.timezoneSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleAddTimezone();
    });
    this.presetBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.addTimezone(e.target.dataset.timezone);
      });
    });
    this.timezoneList.addEventListener('click', (e) => {
      if (e.target.classList.contains('timezone-item')) {
        this.addTimezone(e.target.dataset.timezone);
      }
    });
  }

  handleAddTimezone() {
    const query = this.timezoneSearch.value.trim().toLowerCase();
    if (!query) return;

    const found = ALL_TIMEZONES.find((tz) => tz.toLowerCase().includes(query));
    if (found && !this.activeTzs.includes(found)) {
      this.addTimezone(found);
      this.timezoneSearch.value = '';
    } else if (found) {
      alert(`${found} is already displayed`);
    } else {
      alert(`Timezone not found. Try: "New York", "Tokyo", "London", etc.`);
    }
  }

  addTimezone(tz) {
    if (!this.activeTzs.includes(tz)) {
      this.activeTzs.push(tz);
      this.render();
    }
  }

  removeTimezone(tz) {
    this.activeTzs = this.activeTzs.filter((t) => t !== tz);
    this.render();
  }

  getTimeInTimezone(tz) {
    const now = new Date();
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    return tzTime;
  }

  formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTimePeriod(date) {
    const hours = date.getHours();
    if (hours < 6) return 'Night';
    if (hours < 12) return 'Morning';
    if (hours < 18) return 'Afternoon';
    return 'Evening';
  }

  createClockCard(tz) {
    const tzTime = this.getTimeInTimezone(tz);
    const time = this.formatTime(tzTime);
    const date = this.formatDate(tzTime);
    const period = this.getTimePeriod(tzTime);
    const offset = this.getUTCOffset(tz);
    const [region, city] = tz.split('/');

    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.timezone = tz;
    card.innerHTML = `
      <button class="remove-btn" aria-label="Remove timezone">×</button>
      <div class="timezone-name">${tz}</div>
      <div class="timezone-region">${city ? city.replace(/_/g, ' ') : region}</div>
      <div class="digital-time">${time}</div>
      <div class="date-display">${date}</div>
      <div class="time-details">
        <div class="detail-item">
          <span class="detail-label">UTC Offset</span>
          <span class="detail-value">${offset}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Period</span>
          <span class="detail-value">${period}</span>
        </div>
      </div>
    `;

    card.querySelector('.remove-btn').addEventListener('click', () => {
      this.removeTimezone(tz);
    });

    return card;
  }

  getUTCOffset(tz) {
    const now = new Date();
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const offset = (tzTime - utcTime) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offset));
    const minutes = ((Math.abs(offset) % 1) * 60).toFixed(0);
    return `UTC${sign}${hours}:${minutes.padStart(2, '0')}`;
  }

  populateTimezoneList() {
    this.timezoneList.innerHTML = ALL_TIMEZONES
      .map(
        (tz) => `<div class="timezone-item" data-timezone="${tz}">${tz}</div>`
      )
      .join('');
  }

  render() {
    // Update clock cards
    this.clocksGrid.innerHTML = this.activeTzs
      .map((tz) => this.createClockCard(tz).outerHTML)
      .join('');

    // Re-attach remove button listeners
    this.clocksGrid.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tz = e.target.closest('.clock-card').dataset.timezone;
        this.removeTimezone(tz);
      });
    });

    // Populate timezone list
    this.populateTimezoneList();
  }

  updateClocks() {
    this.clocksGrid.querySelectorAll('.clock-card').forEach((card) => {
      const tz = card.dataset.timezone;
      const tzTime = this.getTimeInTimezone(tz);
      const time = this.formatTime(tzTime);
      const date = this.formatDate(tzTime);
      const period = this.getTimePeriod(tzTime);
      const offset = this.getUTCOffset(tz);

      card.querySelector('.digital-time').textContent = time;
      card.querySelector('.date-display').textContent = date;
      card.querySelector('.detail-value:nth-of-type(2)').textContent = period;
    });
  }

  startClock() {
    setInterval(() => this.updateClocks(), 1000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
  });
} else {
  new DigitalClock();
}
