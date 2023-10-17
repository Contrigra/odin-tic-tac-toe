const buttonContainer = document.querySelector('.button-container');
const resetButton = document.querySelector('.button-reset-game');
const currentContainerSpan = document.querySelector('#current-player');
window.onload = () => {
    screenController.updateScreen();
}
resetButton.addEventListener('click', () => {
    gameController.resetGame()
    screenController.updateScreen()
});

const screenController = function () {
    const renderManyButtons = () => {
        // remove all elements
        buttonContainer.replaceChildren()
        for (let [buttonIndex, buttonValue] of gameController.gameBoard.entries()) {
            renderOneButton(buttonIndex, buttonValue);
        }
    }
    const renderOneButton = (buttonIndex, buttonValue) => {
        const gameButton = document.createElement('button');
        gameButton.textContent = buttonValue;
        gameButton.setAttribute(`data-value`, `${buttonValue}`);
        gameButton.setAttribute(`data-index`, `${buttonIndex}`);
        gameButton.addEventListener('click', () => {
            if (gameController.checkWinner()) {
                screenController.declareWinner()
            } else {
                gameController.changePlayer();
                screenController.updatePlayer();
            }
        })
        gameButton.classList.add('button-pad')
        buttonContainer.appendChild(gameButton);
    }
    const updatePlayer = () => {
        currentContainerSpan.textContent = gameController.currentPlayer
    }

    function declareWinner() {
        // TODO create a new div and declare a winner
    }

    const updateScreen = () => {
        renderManyButtons();
        updatePlayer();
    }
    return {updateScreen, updatePlayer, declareWinner: declareWinner};
}();

const gameController = function () {
    const gameBoard =
        ['X', 'X', 'O',
            'O', 'O', 'O',
            'O', 'O', 'X'];
    const currentPlayer = 'X';
    let winner = false // dummy data

    function resetGame() {
        this.gameBoard = ['', '', '', '', '', '', '', '', '']
    }

    function checkWinner() {
        // TODO Need to analyze the array if there is a winner then congratulate it somehow
        return winner
    }

    function changePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    return {gameBoard, resetGame, currentPlayer, checkWinner, changePlayer};
}();

/* TODO
    1. Responsive Buttons
    * Click on a button should change it's value corresponding to the player.
    * Reflect changes in gameController.gameBoard
    + Each click should trigger gameController.checkWinner()
    2. Determine a winner.
    - When you get a row, then you're the winner.
    - reset should set winner value to false
    3. Proclaim a winner
    + if .checkWinner is not true call screenController.updateWinner() and .changePlayer()


 */



