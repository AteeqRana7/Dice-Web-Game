"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let currentScore = 0;

function init() {
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
}
function disableBtn() {
  btnRoll.classList.add("disabled");
  btnHold.classList.add("disabled");
}
function enableBtn() {
  btnRoll.classList.remove("disabled");
  btnHold.classList.remove("disabled");
}
init();

btnRoll.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  let activePlayer = player0El.classList.contains("player--active") ? 0 : 1;

  if (dice !== 1) {
    currentScore += dice;
    if (activePlayer === 0) {
      current0El.textContent = currentScore;
    } else if (activePlayer === 1) {
      current1El.textContent = currentScore;
    }
  } else {
    if (activePlayer === 0) {
      current0El.textContent = 0;
    } else if (activePlayer === 1) {
      current1El.textContent = 0;
    }
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    currentScore = 0;
  }
});

btnHold.addEventListener("click", function () {
  let activePlayer = player0El.classList.contains("player--active") ? 0 : 1;

  if (activePlayer === 0) {
    score0El.textContent =
      Number(score0El.textContent) + Number(current0El.textContent);
    current0El.textContent = 0;
    if (Number(score0El.textContent) >= 100) {
      player0El.classList.add("player--winner");
      diceEl.classList.add("hidden");
      disableBtn();
    } else {
      player0El.classList.remove("player--active");
      player1El.classList.add("player--active");
    }
  } else if (activePlayer === 1) {
    score1El.textContent =
      Number(score1El.textContent) + Number(current1El.textContent);
    current1El.textContent = 0;
    if (Number(score1El.textContent) >= 100) {
      player1El.classList.add("player--winner");
      diceEl.classList.add("hidden");
      disableBtn();
    } else {
      player1El.classList.remove("player--active");
      player0El.classList.add("player--active");
    }
  }
  currentScore = 0;
});

btnNew.addEventListener("click", function () {
  init();

  if (player0El.classList.contains("player--winner")) {
    player0El.classList.remove("player--winner");
    player0El.classList.add("player--active");
  } else if (player1El.classList.contains("player--winner")) {
    player1El.classList.remove("player--winner");
    player1El.classList.add("player--active");
  }

  enableBtn();
});
