// Declarations
const cells = document.querySelectorAll('.cell');
const currentStatus = document.querySelector('#currentStatus');
const playAgain = document.querySelector('#playAgain');

// Win Conditions
const winConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];
// Temp placeholders for each cell
let placeholder = [[''], [''], [''], [''], [''], [''], [''], [''], ['']];

// Current Player and Game Status
let currentPlayer = 'X';
let isRunning = false;

initializeGame();

function initializeGame(){
    isRunning = true;
    cells.forEach(cell => cell.addEventListener('click', isClicked));
    currentStatus.textContent = `${currentPlayer}'s Turn`;
    playAgain.addEventListener('click', restart);
}

function isClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if (placeholder[cellIndex] != ''){
        return;
    }

    update(this, cellIndex);
    userChange();
    checkWinner();
}

function userChange(){
    if (currentPlayer == 'X'){
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    currentStatus.textContent = `${currentPlayer}'s Turn`
}

function update(cell, index){
    placeholder[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
