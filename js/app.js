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
const rocket = document.querySelector("#rocket");
/*-------------------------------- Variables --------------------------------*/
let oxygen = 0;
let targetMin = 0;
let targetMax = 0;
let gameActive = false;
let oxygenInterval;
let timerInterval;
let countdownInterval;
let level = 1;
let targetRange = 10;

/*-------------------------------- Functions --------------------------------*/
function startGame() {
  clearAll();

  oxygen = 0;

  gameActive = false;

  targetMin = Math.floor(Math.random() * (100 - targetRange));
  targetMax = targetMin +  targetRange;

  targetText.textContent = `Target ${ targetMin } - ${ targetMax }`;
  statusText.textContent = "Get Ready...";
  timerText.textContent = "Time: 5";
  oxygenBar.style.width = "0%";
  oxygenValue.textContent = "0%";
  oxygenText.textContent = "Oxygen Level: 0 / 100";

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
    oxygenText.textContent = `Oxygen Level: ${ oxygen } / 100`;

    if (oxygen >= 100) {
      endGame(false);
    }
  }, 50);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time: ${ timeLeft }`;

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


function endGame(success) {
  clearAll();
  gameActive = false;
  rocket.classList.remove("launch");

  if (success) {
    statusText.textContent = "🚀 DIFFICULTY INCREASED ";
    level++;
    targetRange = Math.max(2,10 - (level-1) *2)
  } else {
    statusText.textContent = "💀 MISSION FAILED!";
  }
}

function restartGame() {
  clearAll();

  oxygen = 0;
  level = 1;
  gameActive = false;

  oxygenBar.style.width = "0%";
  oxygenValue.textContent = "0%";
  oxygenText.textContent= "Oxygen Level: 0 / 100";
  targetRange.textContent = `LEVEL ${level}`
  targetText.textContent = "Target: --";
  countdownText.textContent = "";
  statusText.textContent = "PRESS START";

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
