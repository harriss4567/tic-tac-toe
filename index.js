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
let placeholder = ['', '', '', '', '', '', '', '', ''];

// Current Player and Game Status
let currentPlayer = 'X';
let isRunning = false;

// Initializes game
initializeGame();

function initializeGame(){
    isRunning = true;
    cells.forEach(cell => cell.addEventListener('click', isClicked));
    currentStatus.textContent = `${currentPlayer}'s Turn`;
    playAgain.addEventListener('click', restart);
}

// Checks if a cell is clicked
function isClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if (placeholder[cellIndex] != ''){
        return;
    }

    update(this, cellIndex);
    checkWinner();
}

// Changes User
function userChange(){
    if (currentPlayer == 'X'){
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    currentStatus.textContent = `${currentPlayer}'s Turn`
}

// Updates the cell when clicked
function update(cell, index){
    placeholder[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Checks if there is a winner
function checkWinner(){
    let winner = false;

    // Iterate through winConditions and check if any player has won
    for (let i = 0; i < winConditions.length; i++){
        const checkCondition = winConditions[i];
        const checkOne = placeholder[checkCondition[0]];
        const checkTwo = placeholder[checkCondition[1]];
        const checkThree = placeholder[checkCondition[2]];

        // Skip if any cell is empty in the condition otherwise permanent draw
        if (checkOne == '' || checkTwo == '' || checkThree ==''){
            continue;
        }

        console.log(checkOne)
        // Check if all conditions are the same
        if (checkOne == checkTwo && checkTwo == checkThree){
            winner = true;
            break;
        }
    }

    // Check if there is a winner or a draw
    if (winner){
        currentStatus.textContent = `${currentPlayer} Wins`;
        isRunning = false;
    } else if(!placeholder.includes('')){
        currentStatus.textContent = `Draw`;
    } else{
        userChange();
    }

}

// Restarts game when User clicks Button 'Play Again'
function restart(){
    currentPlayer = 'X';
    currentStatus.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
    placeholder = ['', '', '', '', '', '', '', '', ''];
    isRunning = true;
}