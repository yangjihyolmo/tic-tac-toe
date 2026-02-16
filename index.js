let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let restartBtn = document.getElementById("restart-button")
let playerOInput = document.getElementById("playerO")
let playerXInput = document.getElementById("playerX")
let historyList = document.getElementById("history")
let saveBtn = document.getElementById("savePlayers")

let players = { X: "Player X", O: "Player O" };
let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;

let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

initializeGame();
loadhistory();


function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener("click", restart)
    saveBtn.addEventListener("click", savePlayers);
    statusText.textContent = "Player " + current + "'s turn";
    running = true;
}

function savePlayers() {
    players.X = playerXInput.value || "Player X";
    players.O = playerOInput.value || "Player O";

    localStorage.setItem("players", JSON.stringify(players));
    statusText.textContent = "Player " + current + "'s turn";
}

function loadPlayers() {
    const savedPlayers = localStorage.getItem("players");

    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
        playerXInput.value = players.X;
        playerOInput.value = players.O;
    }
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

    if (current === "X") {
        current = "O";
    }
    else {
        current = "X";
    }

    statusText.textContent = "Player " + current + "'s turn";
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < wins.length; i++) {
        const condition = wins[i];
        const cellA = board[condition[0]]
        const cellB = board[condition[1]]
        const cellC = board[condition[2]]

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${current}'s wins`;
        running = false;
    }
    else if (!board.includes("")) {
        statusText.textContent = "Draw";
        running = false;
    }
    else {
        changePlayer();
    }

}

function restart() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        board[i] = "";
        running = false;
    }
    current = "X";
    statusText.textContent = "Player X's turn";
}