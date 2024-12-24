// Initialize game variables
let randomNumber = Math.floor(Math.random() * 10) + 1; 
let lives = 3; 
const livesDisplay = document.getElementById('lives');
const messageDisplay = document.getElementById('message');
const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const restartGameButton = document.getElementById('restartGame');

// Display initial lives
updateLives();

// Function to update lives display
function updateLives() {
    livesDisplay.innerHTML = '❤️'.repeat(lives);
}

// Generator function to manage game state
function* gameLogic() {
    while (lives > 0) {
        const guess = yield; 

        if (guess === randomNumber) {
            messageDisplay.textContent = '🎉 Congratulations! You guessed the correct number!';
            endGame(true);
            return;
        } else {
            lives--;
            if (lives > 0) {
                messageDisplay.textContent = `Wrong guess! Try again.`;
                updateLives();
            } else {
                messageDisplay.textContent = `😞 Game Over! The correct number was ${randomNumber}.`;
                endGame(false);
                return;
            }
        }
    }
}

// Initialize generator
const game = gameLogic();
game.next(); 

// Handle guess submissions
submitGuessButton.addEventListener('click', () => {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 10) {
        messageDisplay.textContent = 'Please enter a number between 1 and 10.';
        return;
    }

    game.next(guess); 
    guessInput.value = ''; 
});

// Function to handle end of the game
function endGame(win) {
    submitGuessButton.disabled = true;
    restartGameButton.classList.remove('hidden');
    guessInput.disabled = true;
}

// Restart game
restartGameButton.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    lives = 3;
    updateLives();
    messageDisplay.textContent = 'Guess a number between 1 and 10:';
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    restartGameButton.classList.add('hidden');
    game.next(); 
});
