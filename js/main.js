const buttonContainer = document.querySelector('.button-container');
const resetButton = document.querySelector('.button-reset-game');
const playerContainer = document.querySelector('.player-container');
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
        // TODO save index within the button
        gameButton.setAttribute(`data-index`, `${buttonIndex}`);

        gameButton.classList.add('button-pad')
        buttonContainer.appendChild(gameButton);
    }

    const updatePlayer = () => {
        playerContainer.textContent = gameController.currentPlayer

    }
    const updateScreen = () => {
        renderManyButtons();
        updatePlayer();
    }


    return {updateScreen};
}();

const gameController = function () {
    const gameBoard =
        ['x', 'x', 'o',
            'x', 'o', 'o',
            'o', 'x', 'x'];

    const currentPlayer = 'Player X'

    function resetGame() {
        this.gameBoard = ['', '', '',
            '', '', '',
            '', '', '']
    }

    function changePlayer() {
        this.currentPlayer = this.currentPlayer === 'Player X' ? 'Player O' : 'Player X';
    }

    return {gameBoard, resetGame, currentPlayer, changePlayer};

}();

/* TODO
*   1. Proclaim a victor
    - Game controller contains the value (empty by default)
    * Create a dummy function to check a victor that calls screenController.updateVictor()
    - If victor is not null call screenController.updateVictor()
    * reset should set victor value to null
    2. Responsive Buttons
    * Click on a button should change it's value corresponding to the player.
    * Reflect changes in gameController.gameBoard
    * Each click should trigger gameController.checkForVictor()
    3. Determine a victor.
    - When you get a row, then you're the victor.
    *
 */

// TODO Possibly change to store only O or X gameController.currentPlayer


