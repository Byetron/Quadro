document.addEventListener('DOMContentLoaded', () => {
  const holes = document.querySelectorAll('.hole');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('time');
  const startButton = document.getElementById('startButton');

  let score = 0;
  let timeUp = false;
  let gameTime = 30;
  let lastHole;
  let timerId;
  let moleTimerId;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');

    mole.classList.add('up');

    moleTimerId = setTimeout(() => {
      mole.classList.remove('up');
      mole.classList.remove('whacked');
      if (!timeUp) {
        peep();
      }
    }, time);
  }

  function startGame() {
    score = 0;
    gameTime = 30;
    timeUp = false;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${gameTime}s`;
    startButton.disabled = true;

    holes.forEach(hole => {
      const mole = hole.querySelector('.mole');
      mole.classList.remove('up', 'whacked');
    });

    peep();

    timerId = setInterval(() => {
      gameTime--;
      timerDisplay.textContent = `Time: ${gameTime}s`;
      if (gameTime <= 0) {
        clearInterval(timerId);
        clearTimeout(moleTimerId);
        timeUp = true;
        startButton.disabled = false;
        scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
        scoreDisplay.style.color = '#ff0';
      }
    }, 1000);
  }

  function whack(e) {
    const hole = this;
    const mole = hole.querySelector('.mole');
    if (!e.isTrusted || !mole.classList.contains('up') || hole.classList.contains('disabled')) return;

    hole.classList.add('disabled');
    score++;
    mole.classList.add('whacked');
    scoreDisplay.textContent = `Score: ${score}`;

    setTimeout(() => {
      mole.classList.remove('up', 'whacked');
      hole.classList.remove('disabled');
    }, 300);
  }

  holes.forEach(hole => hole.addEventListener('click', whack));
  startButton.addEventListener('click', startGame);
});