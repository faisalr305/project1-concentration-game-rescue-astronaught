/*------------------------ Cached Element References ------------------------*/
const startBtn = document.querySelector("#startbtn");
const rescueBtn = document.querySelector("#rescuebtn");
const restartBtn = document.querySelector("#restartbtn");
const oxygenBar = document.querySelector("#oxygen-bar");
const oxygenValue = document.querySelector("#oxygen-value");
const oxygenText = document.querySelector("#oxygen-text");
const statusText = document.querySelector("#status");
const targetText = document.querySelector("#target");
const timerText = document.querySelector("#timer");
const countdownText = document.querySelector("#countdown");
const messageEl = document.querySelector("#message");
const messageEl2 = document.querySelector("#message2");
const messageEl3 = document.querySelector("#message3");
const messageEl4 = document.querySelector("#message4");

const rocket = document.querySelector("#rocket");
const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
/*-------------------------------- Variables --------------------------------*/
let oxygen = 0;
let targetMin = 0;
let targetMax = 0;
let gameActive = false;
let oxygenInterval;
let timerInterval;
let countdownInterval;
let level = 1;
let targetRange = 20;
let timeLeft = 5;
let score = 0;
let lives = 3;

/*-------------------------------- Functions --------------------------------*/
function startGame() {
  clearAll();
  update();
  oxygen = 0;
  gameActive = false;
  timeLeft = 5;

  if (level === 1) targetRange = 20;
  else if (level === 2) targetRange = 15;
  else if (level === 3) targetRange = 10;
  else if (level === 4) targetRange = 5;

  targetMin = Math.floor(Math.random() * (100 - targetRange));
  targetMax = targetMin + targetRange;

  targetText.textContent = `Target ${targetMin} - ${targetMax}`;
  statusText.textContent = `LEVEL ${level}`;
  timerText.textContent = "Time: 5";
  oxygenBar.style.width = "0%";
  oxygenValue.textContent = "0%";
  oxygenText.textContent = "Oxygen Level: 0 / 100";

  messageEl.style.display = "none";
  messageEl2.style.display = "none";
  messageEl3.style.display = "none";
  messageEl4.style.display = "none";


  startCountdown();
}

function startCountdown() {
  let count = 5;
  countdownText.textContent = count;

  countdownInterval = setInterval(() => {
    count--;

    if (count > 0) {
      countdownText.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownText.textContent = "GO!";
      rocket.classList.add("launch");

      setTimeout(() => {
        countdownText.textContent = "";
        beginMission();
      }, 1000);
    }
  }, 1000);
}

function beginMission() {
  gameActive = true;
  statusText.textContent = "Rescue the Astronaut!";

  oxygenInterval = setInterval(() => {
    oxygen++;

    oxygenBar.style.width = oxygen + "%";
    oxygenValue.textContent = oxygen + "%";
    oxygenText.textContent = `Oxygen Level: ${oxygen} / 100`;

    if (oxygen >= 100) {
      endGame(false);
    }
  }, 50);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);
}

function rescueAstronaut() {
  if (!gameActive) return;

  if (oxygen >= targetMin && oxygen <= targetMax) {
    endGame(true);
  } else {
    endGame(false);
  }
}
function update() {
  scoreEl.textContent = `score: ${score}`;
  livesEl.textContent = `lives: ${(lives)}`;
}

function endGame(success) {
  clearAll();
  gameActive = false;
  rocket.classList.remove("launch");

  if (success) {
    score += 100;
    update();

    if (level < 4) {
      messageEl.style.display = "block";
      messageEl.textContent = "🚀 DIFFICULTY INCREASED";
      level++;
    } else {
      messageEl3.style.display = "block";
      messageEl3.textContent = "🎉  YOU COMPLETED ALL THE LEVELS!";
    }
  } else {
    lives--;
    update();
    if (lives > 0) {
      messageEl4.style.display = "block";
      messageEl4.textContent = " 🚀 TRY AGAIN!";

    } else {
      messageEl2.style.display = "block";
      messageEl2.textContent = "💀 MISSION FAILED!";
    }
  }

}

function restartGame() {
  clearAll();

  oxygen = 0;
  level = 1;
  gameActive = false;
  targetRange = 20;
  timeLeft = 5;
  score = 0;
  lives = 3;
  update();


  oxygenBar.style.width = "0%";
  oxygenValue.textContent = "0%";
  oxygenText.textContent = "Oxygen Level: 0 / 100";
  targetText.textContent = "Target: --";
  countdownText.textContent = "";
  timerText.textContent = "Time: 5";
  statusText.textContent = "PRESS START";

  messageEl.style.display = "none";
  messageEl2.style.display = "none";
  messageEl3.style.display = "none";
  messageEl4.style.display = "none";

  rocket.classList.remove("launch");
}

function clearAll() {
  clearInterval(oxygenInterval);
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
}

/*----------------------------- Event Listeners -----------------------------*/
startBtn.addEventListener("click", startGame);
rescueBtn.addEventListener("click", rescueAstronaut);
restartBtn.addEventListener("click", restartGame);