// Counter Logic
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Set the date you got together
const togetherDate = new Date('2024-12-29');

function updateCounter() {
  const now = new Date();
  const diff = now - togetherDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// Raindrop Logic
const rainContainer = document.querySelector('.rain');
const umbrellaImage = document.querySelector('.umbrella-couple img');

function createRain() {
  const rainDrop = document.createElement('div');
  rainDrop.classList.add('rain-drop');
  rainDrop.style.left = `${Math.random() * 100}%`; // Random horizontal position
  rainDrop.style.animationDuration = `${Math.random() * 2 + 3}s`; // Slow down the rain (3-5 seconds)
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

setInterval(createRain, 200); // Create a new raindrop every 200ms (slower rain)