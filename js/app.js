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
let timeLeft = 5;
let targetMin = 0;
let targetMax = 0;
let gameActive = false;
let oxygenInterval;
let timerInterval;
let countdownInterval;

/*-------------------------------- Functions --------------------------------*/


function startGame() {
  clearAll();

  oxygen = 0;
  timeLeft = 5;
  gameActive = false;

  targetMin = Math.floor(Math.random() * 90);
  targetMax = targetMin + 10;

  targetText.textContent = Target: ${targetMin} - ${targetMax};
  statusText.textContent = "Get Ready...";
  timerText.textContent = "Time: 5";

  oxygenBar.style.width = "0%";
  oxygenValue.textContent = "0%";
  oxygenText.textContent = "Oxygen Level: 0 / 100";

  startCountdown();
}












/*----------------------------- Event Listeners -----------------------------*/
