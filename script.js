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

// Function to create raindrops and check for collisions
function createRain() {
  const rainDrop = document.createElement('div');
  rainDrop.classList.add('rain-drop');
  rainDrop.style.animationDuration = `${Math.random() * 2 + 3}s`; // Raindrop animation duration (3-5 seconds)

  // Recalculate umbrella position every time
  const umbrellaRect = umbrellaImage.getBoundingClientRect();

  // Randomly position raindrops, creating rain all over the screen but more above the umbrella
  const umbrellaLeft = umbrellaRect.left;
  const umbrellaWidth = umbrellaRect.width;
  const umbrellaRight = umbrellaRect.right;
  const umbrellaTop = umbrellaRect.top;
  const screenWidth = window.innerWidth;
  
  // More raindrops above the umbrella and random across the screen
  let rainDropLeft, rainDropTop;
  if (Math.random() < 0.7) {
    // 70% chance the raindrop will fall near the umbrella
    rainDropLeft = Math.random() * (umbrellaWidth + 100) + (umbrellaLeft - 50); // Spread 100px left and right of umbrella
    rainDropTop = -20; // Start just above the screen
  } else {
    // 30% chance it will fall randomly anywhere on the screen
    rainDropLeft = Math.random() * screenWidth; // Random position across the entire screen
    rainDropTop = -20; // Start just above the screen
  }

  rainDrop.style.left = `${rainDropLeft}px`; // Position raindrop around the umbrella
  rainDrop.style.top = `${rainDropTop}px`; // Start just above the visible area

  rainContainer.appendChild(rainDrop);

  // Track raindrop position and check for collisions with the umbrella
  function checkCollision() {
    const rainDropRect = rainDrop.getBoundingClientRect();

    // Check if the raindrop is within the umbrella's bounds
    if (
      rainDropRect.bottom >= umbrellaTop &&
      rainDropRect.top <= umbrellaRect.bottom &&
      rainDropRect.left >= umbrellaLeft &&
      rainDropRect.right <= umbrellaRight
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

// Create splash effect when raindrop hits umbrella
function createSplash(x, y) {
  const splash = document.createElement('div');
  splash.classList.add('rain-splash');
  splash.style.left = `${x}px`;
  splash.style.top = `${y}px`;
  rainContainer.appendChild(splash);

  // Remove splash after animation ends
  splash.addEventListener('animationend', () => {
    splash.remove();
  });
}

// Adjust the frequency of raindrop creation for a stable, continuous rain effect
setInterval(createRain, 150); // Create a new raindrop every 150ms for a more continuous effect
