let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let restart = document.getElementById("restart-button")

let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
initalizeGame()

function initalizeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restart.addEventListener("click", restart)
    statusText.textContent = `${current}'s turn`;
    running = false;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")
    if (board[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index) {
    board[index] = current;
    cell.textContent = current;
}

function changePlayer() {

}

function checkWinner() {

}

function restart() {

}