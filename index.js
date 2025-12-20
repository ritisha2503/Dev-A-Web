
const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = "red";

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const newGameBtn = document.getElementById("new-game");

function initBoard() {
    board = [];
    for (let r = 0; r < rows; r++) {
        board[r] = Array(cols).fill(null);
    }
}

function createBoardHTML() {
    boardEl.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", handleCellClick);
            boardEl.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    const col = parseInt(e.target.dataset.col);

    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            updateUI(r, col);
            
            if (checkWin(r, col)) {
                statusEl.textContent = `${currentPlayer === "red" ? "Player 1 (Red)" : "Player 2 (Yellow)"} Wins! 🎉`;
                statusEl.style.background = currentPlayer === "red" ? "#e63946" : "#f1c40f";
                statusEl.style.color = "white";
                disableBoard();
                return;
            }
            
            if (checkDraw()) {
                statusEl.textContent = "It's a Draw! 🤝";
                statusEl.style.background = "#6c757d";
                statusEl.style.color = "white";
                return;
            }
            
            switchPlayer();
            return;
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 0, 1) ||  // Horizontal
        checkDirection(row, col, 1, 0) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal \
        checkDirection(row, col, 1, -1)    // Diagonal /
    );
}

function checkDirection(row, col, deltaRow, deltaCol) {
    let count = 1;
    const player = board[row][col];
    
    count += countInDirection(row, col, deltaRow, deltaCol, player);
    
    count += countInDirection(row, col, -deltaRow, -deltaCol, player);
    
    return count >= 4;
}

function countInDirection(row, col, deltaRow, deltaCol, player) {
    let count = 0;
    let r = row + deltaRow;
    let c = col + deltaCol;
    
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
        count++;
        r += deltaRow;
        c += deltaCol;
    }
    
    return count;
}

function checkDraw() {
    for (let c = 0; c < cols; c++) {
        if (!board[0][c]) {
            return false;
        }
    }
    return true;
}

function disableBoard() {
    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.cursor = 'not-allowed';
        cell.replaceWith(cell.cloneNode(true));
    });
}

function updateUI(row, col) {
    const index = row * cols + col;
    const cell = boardEl.children[index];
    cell.classList.add(currentPlayer);
}

function switchPlayer() {
    currentPlayer = currentPlayer === "red" ? "yellow" : "red";

    statusEl.textContent =
        currentPlayer === "red"
            ? "Player 1 (Red) — Your Turn"
            : "Player 2 (Yellow) — Your Turn";
}

resetBtn.addEventListener("click", () => {
    initBoard();
    createBoardHTML();
    statusEl.style.background = "#f8f9fa";
    statusEl.style.color = "black";
    statusEl.textContent = currentPlayer === "red" 
        ? "Player 1 (Red) — Your Turn" 
        : "Player 2 (Yellow) — Your Turn";
});

newGameBtn.addEventListener("click", () => {
    initBoard();
    createBoardHTML();
    currentPlayer = "red";
    statusEl.style.background = "#f8f9fa";
    statusEl.style.color = "black";
    statusEl.textContent = "Player 1 (Red) — Your Turn";
});

initBoard();
createBoardHTML();