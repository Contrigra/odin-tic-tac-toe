const buttonContainer = document.querySelector('.button-container');
const resetButton = document.querySelector('.button-reset-game');

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
        for (let buttonValue of gameController.gameBoard) {
            renderOneButton(buttonValue);
        }
    }

    const renderOneButton = (buttonValue) => {
        const gameButton = document.createElement('button');
        gameButton.textContent = (buttonValue);
        gameButton.setAttribute(`data-value`, `${buttonValue}`);
        gameButton.classList.add('button-pad')
        buttonContainer.appendChild(gameButton);
    }

    const updateScreen = () => renderManyButtons();
    return {updateScreen};
}();
const gameController = function () {
    const gameBoard =
        ['x', 'x', 'o',
            'x', 'o', 'o',
            'o', 'x', 'x'];

    function resetGame() {
        this.gameBoard = ['', '', '',
            '', '', '',
            '', '', '']
    }

    return {gameBoard, resetGame};
}();



console.log(gameController.gameBoard)
// console.log(gameController.resetGame())
console.log(gameController.gameBoard)
gameController.sayWinner = () => console.log('Winner is you!')
console.log(gameController)
