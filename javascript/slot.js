const symbols = ['🍒', '🔔', '7'];
const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');
const slotMachine = document.querySelector('.slot-machine');

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReel(reel, duration, callback) {
  let start = null;
  let symbolIndex = 0;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const cycleTime = 100;

    if (progress < duration) {
      symbolIndex = (symbolIndex + 1) % symbols.length;
      reel.textContent = symbols[symbolIndex];
      setTimeout(() => requestAnimationFrame(animate), cycleTime);
    } else {
      reel.textContent = getRandomSymbol();
      callback();
    }
  }

  requestAnimationFrame(animate);
}

function spin() {
  spinButton.disabled = true;
  resultDisplay.textContent = '';
  let completedReels = 0;

  reels.forEach((reel, index) => {
    const duration = 1000 + index * 500;
    spinReel(reel, duration, () => {
      completedReels++;
      if (completedReels === reels.length) {
        checkWin();
        spinButton.disabled = false;
      }
    });
  });
}

function checkWin() {
  const results = reels.map(reel => reel.textContent);
  if (results.every(symbol => symbol === results[0])) {
    resultDisplay.textContent = 'Jackpot! You Win!';
    slotMachine.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = '/sush/hand.html';
    }, 1000);
  } else {
    resultDisplay.textContent = 'Try Again!';
  }
}

spinButton.addEventListener('click', spin);