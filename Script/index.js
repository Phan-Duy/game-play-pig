// Get DOM elements
const player1Score = document.querySelector('.player__score1');
const player2Score = document.querySelector('.player__score2');
const playerTurn = document.querySelector('.player__turn');
const points = document.querySelector('.points');
const rollDiceBtn = document.querySelector('.roll__dice__btn');
const holdBtn = document.querySelector('.hold__btn');
const newGameBtn = document.querySelector('.new__game__btn');

// Game state variables
let currentPlayer = 1; // Start with Player 1
let currentPoints = 0;
let player1Total = 0;
let player2Total = 0;
let gameOver = false;

// Helper functions
function updateScores() {
  player1Score.value = player1Total;
  player2Score.value = player2Total;
}

function updateCurrentPlayer() {
  playerTurn.value = `Player ${currentPlayer}`;
}

function updatePoints() {
  points.value = currentPoints;
}

// Game logic functions
function rollDie() {
  if (!gameOver) {
    let roll = Math.floor(Math.random() * 6) + 1;
    points.value = roll; // Display the rolled number

    if (roll === 1) {
      currentPoints = 0;
      switchPlayer();
      alert(`Player ${currentPlayer} rolled a 1! Turn over.`);
    } else {
      currentPoints += roll;
      updatePoints();
    }
  }
}

function holdScore() {
  if (!gameOver) {
    if (currentPlayer === 1) {
      player1Total += currentPoints;
    } else {
      player2Total += currentPoints;
    }
    currentPoints = 0;
    updateScores();
    updatePoints();
    checkWinCondition();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateCurrentPlayer();
}

function checkWinCondition() {
  if (player1Total >= 20) {
    gameOver = true;
    alert(`Player 1 wins!`);
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  } else if (player2Total >= 20) {
    gameOver = true;
    alert(`Player 2 wins!`);
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  }
}

function newGame() {
  player1Total = 0;
  player2Total = 0;
  currentPoints = 0;
  currentPlayer = 1;
  gameOver = false;
  updateScores();
  updatePoints();
  updateCurrentPlayer();
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
}

// Event listeners
rollDiceBtn.addEventListener('click', rollDie);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', newGame);

// Initialize the game
updateScores();
updateCurrentPlayer();