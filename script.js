// Counter Logic
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Set the date you got together
const togetherDate = new Date('2024-12-29');

function updateCounter() {
  const now = new Date();
  const diff = now - togetherDate; // Calculate time remaining (future date)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Zero-padding for consistent formatting
  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCounter, 1000);
updateCounter();

// Raindrop Logic
const rainContainer = document.querySelector('.rain');
const umbrellaImage = document.querySelector('.umbrella-couple img');

function createRain() {
  const rainDrop = document.createElement('div');
  rainDrop.classList.add('rain-drop');
  rainDrop.style.animationDuration = `${Math.random() * 1 + 2}s`; // Faster raindrops (2-3 seconds)

  // Randomly position raindrops across the screen
  rainDrop.style.left = `${Math.random() * 100}%`;

  rainContainer.appendChild(rainDrop);

  // Track raindrop position and check for collisions
  function checkCollision() {
    const umbrellaRect = umbrellaImage.getBoundingClientRect();
    const rainDropRect = rainDrop.getBoundingClientRect();

    // Check if raindrop is within the umbrella's bounds
    if (
      rainDropRect.bottom >= umbrellaRect.top &&
      rainDropRect.top <= umbrellaRect.bottom &&
      rainDropRect.left >= umbrellaRect.left &&
      rainDropRect.right <= umbrellaRect.right
    ) {
      // Raindrop hits the umbrella
      createSplash(rainDropRect.left, umbrellaRect.top); // Create splash effect
      rainDrop.remove(); // Remove the raindrop
      return;
    }

    // Continue checking for collisions
    if (rainDrop.isConnected) {
      requestAnimationFrame(checkCollision);
    }
  }

  // Start collision detection
  requestAnimationFrame(checkCollision);
}

// Create splash effect
function createSplash(x, y) {
  const splash = document.createElement('div');
  splash.classList.add('rain-splash');
  splash.style.left = `${x}px`;
  splash.style.top = `${y}px`;
  rainContainer.appendChild(splash);

  // Remove splash after animation
  splash.addEventListener('animationend', () => {
    splash.remove();
  });
}

// Adjust the frequency of raindrop creation for a lighter rain effect
setInterval(createRain, 200); // Create a new raindrop every 200ms