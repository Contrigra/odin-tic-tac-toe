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
        gameButton.addEventListener('click', (e) => {

            if (gameController.winner !== true) { // prohibit further clicks if there is the winner declared
                if (gameController.updateGameBoard(Number(e.currentTarget.dataset.index))) { //check legitimacy
                    if (gameController.checkWinner()) {
                        screenController.updateScreen();
                        screenController.declareWinner();
                    } else {
                        gameController.changePlayer();
                        screenController.updatePlayer();
                        screenController.updateScreen();
                    }
                }
            }
        })
        gameButton.classList.add('button-pad')
        buttonContainer.appendChild(gameButton);
    }

    function declareTie() {
        // const playerContainer = document.querySelector('.player-container')
        // playerContainer.replaceChildren()
        // TODO

    }

    function resetPlayerContainer() {
        // TODO
    }

    function declareWinner() {
        const winnerDiv = document.createElement('div');
        winnerDiv.textContent = `the winner is ${gameController.currentPlayer}`;
        currentContainerSpan.textContent = `${gameController.currentPlayer} is the winner! `;
    }


    const updatePlayer = () => {
        currentContainerSpan.textContent = gameController.currentPlayer

    }
    const updateScreen = () => {
        renderManyButtons();
        updatePlayer();
    }
    return {updateScreen, updatePlayer, declareWinner, declareTie};
}();

const gameController = function () {
    const gameBoard = ['', '', '', '', '', '', '', '', ''];
    const currentPlayer = 'X';
    let winner = false;

    function resetGame() {
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.winner = false;
    }

    function checkTie() {
        // TODO
    }

    function checkWinner() {
        //@formatter:off
        const winCombinations = {
            horizontalTop:       [this.gameBoard[0], this.gameBoard[1], this.gameBoard[2]],
            horizontalBottom:    [this.gameBoard[6], this.gameBoard[7], this.gameBoard[8]],
            verticalLeft:        [this.gameBoard[0], this.gameBoard[3], this.gameBoard[6]],
            verticalRight:       [this.gameBoard[2], this.gameBoard[5], this.gameBoard[8]],
            diagonalLeftToRight: [this.gameBoard[0], this.gameBoard[4], this.gameBoard[8]],
            diagonalRightToLeft: [this.gameBoard[2], this.gameBoard[4], this.gameBoard[6]],
            middleVertical:      [this.gameBoard[1], this.gameBoard[4], this.gameBoard[7]],
            middleHorizontal:    [this.gameBoard[3], this.gameBoard[4], this.gameBoard[5]],
        }
        //@formatter:on

        // determine winner flag value if a set created from a combination contains only X or O, then the row is a winner's one
        for (let combination in winCombinations) {
            let set = new Set(winCombinations[combination]);
            if (set.has('')) {  // guard, as set of  '' and 'X' counts as .size === 2
            } else if (set.size < 2) {
                this.winner = true
            }
        }
        return this.winner
    }

    function changePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    function updateGameBoard(index) {
        if (this.gameBoard[index] === '') {
            this.gameBoard[index] = this.currentPlayer

            return true // legitimate
        }
        return false // move was illegitimate (e.g. clicked on a cell that already got a value)
    }

    return {
        gameBoard,
        resetGame,
        currentPlayer,
        checkWinner,
        changePlayer,
        updateGameBoard,
        winner
    };
}();





