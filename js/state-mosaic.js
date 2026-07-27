// State mosaic generator
// Define the 36 states and FCT
const states = [
  { name: 'Abia', status: 'upcoming' },
  { name: 'Adamawa', status: 'upcoming' },
  { name: 'Akwa Ibom', status: 'upcoming' },
  { name: 'Anambra', status: 'live' },
  { name: 'Bauchi', status: 'live' },
  { name: 'Bayelsa', status: 'upcoming' },
  { name: 'Benue', status: 'live' },
  { name: 'Borno', status: 'upcoming' },
  { name: 'Cross River', status: 'upcoming' },
  { name: 'Delta', status: 'upcoming' },
  { name: 'Ebonyi', status: 'upcoming' },
  { name: 'Edo', status: 'upcoming' },
  { name: 'Ekiti', status: 'upcoming' },
  { name: 'Enugu', status: 'live' },
  { name: 'FCT', status: 'upcoming' },
  { name: 'Gombe', status: 'upcoming' },
  { name: 'Imo', status: 'live' },
  { name: 'Jigawa', status: 'live' },
  { name: 'Kaduna', status: 'live' },
  { name: 'Kano', status: 'live' },
  { name: 'Katsina', status: 'upcoming' },
  { name: 'Kebbi', status: 'upcoming' },
  { name: 'Kogi', status: 'upcoming' },
  { name: 'Kwara', status: 'upcoming' },
  { name: 'Lagos', status: 'upcoming' },
  { name: 'Nasarawa', status: 'upcoming' },
  { name: 'Niger', status: 'upcoming' },
  { name: 'Ogun', status: 'upcoming' },
  { name: 'Ondo', status: 'upcoming' },
  { name: 'Osun', status: 'upcoming' },
  { name: 'Oyo', status: 'upcoming' },
  { name: 'Plateau', status: 'upcoming' },
  { name: 'Rivers', status: 'upcoming' },
  { name: 'Sokoto', status: 'upcoming' },
  { name: 'Taraba', status: 'upcoming' },
  { name: 'Yobe', status: 'upcoming' },
  { name: 'Zamfara', status: 'upcoming' }
];

// Populate the mosaic grid
function initMosaicGrid() {
  const mosaicGrid = document.getElementById('mosaic');
  if (!mosaicGrid) return;

  states.forEach((state) => {
    const tile = document.createElement('div');
    tile.className = `state-tile ${state.status}`;
    tile.setAttribute('aria-label', `${state.name} - ${state.status}`);
    tile.innerHTML = `
      ${state.name}
      <div class="tooltip">${state.name}</div>
    `;
    mosaicGrid.appendChild(tile);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMosaicGrid);
} else {
  initMosaicGrid();
}
