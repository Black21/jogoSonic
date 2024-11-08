const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector(".menu-lives h2"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    alert("Game Over! O seu resultado foi: " + state.values.result);
    resetGame();
  }
}

function playSound(audioName) {
  let audio = new Audio(`../audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("sonic_ring");
      } else {
        state.values.lives--;
        playSound("sonic-rings-drop");
        state.view.lives.textContent = `x${state.values.lives}`;

        if (state.values.lives < 0) {
          clearInterval(state.actions.countDownTimerId);
          clearInterval(state.actions.timerId);

          alert("Game Over! O seu resultado foi: " + state.values.result);

          resetGame();
        }
      }
    });
  });
}

function init() {
  addListenerHitBox();
}

init();

function resetGame() {
  // Resetando todas as variáveis de estado
  state.values.lives = 3;
  state.values.result = 0;
  state.values.currentTime = 60;
  state.view.score.textContent = state.values.result;
  state.view.lives.textContent = `x${state.values.lives}`;
  state.view.timeLeft.textContent = state.values.currentTime;

  // Limpar os intervalos anteriores
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);

  // Iniciar novos intervalos
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);

  // Reiniciar o painel
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });
}
