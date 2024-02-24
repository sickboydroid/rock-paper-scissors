const ROCK = "rock";
const PAPER = "paper";
const SCISSOR = "scissor";

function getComputerChoice() {
  let seed = Math.random() * 100;
  if (seed < 33) return ROCK;
  else if (seed <= 66) return PAPER;
  else return SCISSOR;
}

function playRound(playerChoice, computerChoice) {
  if (
    (computerChoice === PAPER && playerChoice === ROCK) ||
    (computerChoice === SCISSOR && playerChoice === PAPER) ||
    (computerChoice === ROCK && playerChoice === SCISSOR)
  )
    return -1;
  if (
    (computerChoice === SCISSOR && playerChoice == ROCK) ||
    (computerChoice === PAPER && playerChoice === SCISSOR) ||
    (computerChoice === ROCK && playerChoice === PAPER)
  )
    return 1;
  return 0;
}

// add event listeners
const playerChoiceBtns = document.querySelectorAll("#rock, #scissor, #paper");
const displayDiv = document.querySelector(".display");
const scoreDiv = document.querySelector(".score");
const winnerDiv = document.querySelector(".winner");
let playerScore = 0;
let computerScore = 0;
playerChoiceBtns.forEach((e) =>
  e.addEventListener("click", function (event) {
    if (playerScore === 5) resetGame();
    const computerChoice = getComputerChoice();
    const playerChoice = event.target.value.toLowerCase();
    const score = playRound(playerChoice, computerChoice);
    switch (score) {
      case -1:
        computerScore++;
        displayDiv.textContent = `You lose, ${computerChoice} beats ${playerChoice}`;
        break;
      case 1:
        playerScore++;
        displayDiv.textContent = `You win, ${playerChoice} beats ${computerChoice}`;
        break;
      case 0:
        displayDiv.textContent = `Tie! Computer choose ${computerChoice}`;
        break;
    }
    updateScore();
    if (playerScore === 5) endGame();
  })
);

function updateScore() {
  scoreDiv.children[0].textContent = `Player: ${playerScore}`;
  scoreDiv.children[1].textContent = `Computer: ${computerScore}`;
}

function endGame() {
  winnerDiv.style.display = "block";
  if (playerScore > computerScore) winnerDiv.textContent = "You won!!";
  else if (playerScore < computerScore) winnerDiv.textContent = "You lost!!";
  else winnerDiv.textContent = "It is a tie.";
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  winnerDiv.style.display = "none";
  displayDiv.textContent = "Play game to see result";
}

resetGame();
