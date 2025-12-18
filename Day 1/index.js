const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = 'Red';

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const newGameBtn = document.getElementById('new-game');

function initBoard() {
    board = [];
    for (let r = 0; r < rows; r++) {
        board[r] = Array(cols).fill(null);
    }
}

function createBoardHTML() {
    boardEl.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            boardEl.appendChild(cell);
        }
    }
}