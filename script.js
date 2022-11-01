// query selectors
const gameCells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#reset');
const header = document.querySelector('#gameHeader');

// global declarations
const winnerWinnerChickenDinner = [[7, 8, 9], [3, 5, 7], [1, 5, 9], [1, 4, 7],
[2, 5, 8], [4, 5, 6], [3, 6, 9], [1, 2, 3]];  // winning params
let currGame = ['', '', '', '', '', '', '', '', '']  // current game layout
let xTurn = true;  // X goes first per google
let currPlayer = 'X';  // X goes first per google
let xChosen = [];  // array of cells x has chosen
let oChosen = [];  // array of cells o has chosen
let gameover = false;  // if true, someone has won

// initialize the game
gameInit = () => {
    gameCells.forEach(cell => cell.addEventListener('click', cellChosen));
    restartButton.addEventListener('click', restart);

    header.innerHTML = 'Welcome to TicTacToe!';
    restartButton.style.visibility = 'hidden';

    // game specific redeclarations
    currGame = ['', '', '', '', '', '', '', '', ''];
    xTurn = true;
    currPlayer = 'X';
    xChosen = [];
    oChosen = [];
    gameover = false;

    // initialize content
    for (let i = 0; i < gameCells.length; ++i) {
        gameCells[i].innerHTML = i + 1;
        gameCells[i].disabled = false;
    }
};

// function for cell being chosen
cellChosen = (curr) => {
    const index = Number(curr.target.innerHTML);
    updateCell(curr.target, index);
    checkGameState();

    if (gameover) {
        endgame();
    }
};

// updates content of cell
updateCell = (content, index) => {
    xTurn ? xChosen.push(index) : oChosen.push(index);
    currGame[index] = content.innerHTML = currPlayer;
    content.disabled = true;
    updatePlayer();
};

// changes the player
updatePlayer = () => {
    if (currPlayer === 'X') {
        currPlayer = 'O';
        xTurn = false;
    }
    else {
        currPlayer = 'X';
        xTurn = true;
    }
};

// checks if the game is over and who won
checkGameState = () => {
    for (let i = 0; i < winnerWinnerChickenDinner.length; ++i) {
        const cell1 = winnerWinnerChickenDinner[i][0];
        const cell2 = winnerWinnerChickenDinner[i][1];
        const cell3 = winnerWinnerChickenDinner[i][2];

        if (xChosen.includes(cell1) && xChosen.includes(cell2) && xChosen.includes(cell3)) {
            gameover = true;
            winner = 'X'
            return;
        }
        else if (oChosen.includes(cell1) && oChosen.includes(cell2) && oChosen.includes(cell3)) {
            gameover = true;
            winner = 'O';
            return;
        }
    }
    if (xChosen.length + oChosen.length === 9 && gameover === false) {
        gameover = true;
        winner = 'Draw'
        return;
    }
};

// outputs the winner
endgame = () => {
    for (let i = 0; i < gameCells.length; ++i) {
        gameCells[i].disabled = true;
    }
    if (winner !== 'Draw') {
        header.innerHTML = 'Player ' + winner + ' won the game!'
    }
    else {
        header.innerHTML = winner;
    }
    restartButton.style.visibility = 'visible';
};

// event for reset button, restart the game
restart = () => {
    gameInit();
};

// run the game initially
gameInit();

