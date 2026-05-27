const cursor = document.querySelector('.custom-cursor');
const magneticBtn = document.querySelector('.magnetic-btn');
const btnText = document.querySelector('.btn-text');

// 1. Smoothly track cursor coordinates across the window
window.addEventListener('mousemove', (e) => {
  // Use requestAnimationFrame for high performance rendering loop
  window.requestAnimationFrame(() => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
});

// 2. Handle the Magnetic Pull calculation
magneticBtn.addEventListener('mousemove', (e) => {
  // Get positional boundary dimensions of the button on screen
  const rect = magneticBtn.getBoundingClientRect();
  
  // Find the exact center point of the button
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;
  
  // Measure the distance vector between cursor position and button center
  const distanceX = e.clientX - btnCenterX;
  const distanceY = e.clientY - btnCenterY;
  
  // Set the structural shift multiplier (Pull Strength)
  // Higher value divides the distance more, resulting in a subtler shift
  const totalPullStrength = 3; 
  const textPullStrength = 1.5;

  const moveX = distanceX / totalPullStrength;
  const moveY = distanceY / totalPullStrength;
  
  const textX = distanceX / textPullStrength;
  const textY = distanceY / textPullStrength;

  // Dynamically push raw calculation coordinates directly back into CSS variables
  magneticBtn.style.setProperty('--x', moveX);
  magneticBtn.style.setProperty('--y', moveY);
  
  btnText.style.setProperty('--text-x', textX);
  btnText.style.setProperty('--text-y', textY);
});

// 3. Reset positions cleanly when mouse leaves the element threshold
magneticBtn.addEventListener('mouseleave', () => {
  magneticBtn.style.setProperty('--x', 0);
  magneticBtn.style.setProperty('--y', 0);
  btnText.style.setProperty('--text-x', 0);
  btnText.style.setProperty('--text-y', 0);
});