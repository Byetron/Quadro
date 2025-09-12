const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('#gameStatus');
const resetButton = document.querySelector('#resetButton');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetButton.addEventListener('click', resetGame);
    gameStatus.textContent = `X's turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] !== "" || !running || currentPlayer === "O") {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (running) {
        changePlayer();
        if (currentPlayer === "O") {
            setTimeout(computerMove, 500);
        }
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
}

function computerMove() {
    let move = getBestMove();
    if (move !== -1) {
        const cell = cells[move];
        updateCell(cell, move);
        checkWinner();
        if (running) {
            changePlayer();
        }
    }
}

function getBestMove() {
    // 1. Check if computer can win
    let winningMove = findWinningMove("O");
    if (winningMove !== -1) {
        return winningMove;
    }

    // 2. Check if human player can win and block them
    let blockingMove = findWinningMove("X");
    if (blockingMove !== -1) {
        return blockingMove;
    }

    // 3. Take the center spot, or a random corner if available
    const strongMoves = [4, 0, 2, 6, 8];
    for (let i = 0; i < strongMoves.length; i++) {
        const move = strongMoves[i];
        if (options[move] === "") {
            // A 50% chance to make a strategic move
            if (Math.random() < 0.5) {
                return move;
            }
        }
    }
    
    // 4. If no strategic moves are chosen, take a random available cell
    const availableCells = options.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        return availableCells[randomIndex];
    }
    
    return -1;
}

function findWinningMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];

        let emptyIndex = -1;
        let count = 0;

        if (a === player) {
            count++;
        } else if (a === "") {
            emptyIndex = condition[0];
        }

        if (b === player) {
            count++;
        } else if (b === "") {
            emptyIndex = condition[1];
        }

        if (c === player) {
            count++;
        } else if (c === "") {
            emptyIndex = condition[2];
        }

        if (count === 2 && emptyIndex !== -1) {
            return emptyIndex;
        }
    }
    return -1;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        gameStatus.textContent = `Draw!`;
        running = false;
    } else {
        // Game continues, no message needed
    }
}

function resetGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
    running = true;
}