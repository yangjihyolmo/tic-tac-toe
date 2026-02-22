let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let restartBtn = document.getElementById("restart-button")
let playerOInput = document.getElementById("playerO")
let playerXInput = document.getElementById("playerX")
let historyList = document.getElementById("history")
let saveBtn = document.getElementById("savePlayers")

let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;

let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener("click", restart);
    saveBtn.addEventListener("click", savePlayers);

    loadPlayers();
    displayHistory();

    statusText.textContent = "Player " + current + "'s turn";
    running = true;
}

function savePlayers() {
    const playerX = playerXInput.value.trim();
    const playerO = playerOInput.value.trim();

    if (playerX === "" || playerO === "") {
        alert("Please enter names for both players.");
        return;
    }

    localStorage.setItem("playerX", playerX);
    localStorage.setItem("playerO", playerO);

    alert("Players saved successfully!");
}

function loadPlayers() {
    const savedX = localStorage.getItem("playerX");
    const savedO = localStorage.getItem("playerO");

    if (savedX) playerXInput.value = savedX;
    if (savedO) playerOInput.value = savedO;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")
    if (board[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = current;
    cell.textContent = current;
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
        let winnerName;
        if (current === "X") {
            winnerName = localStorage.getItem("playerX") || "Player X";
        } else {
            winnerName = localStorage.getItem("playerO") || "Player O";
        }

        statusText.textContent = winnerName + " wins!";
        saveHistory(winnerName);
        running = false;
        return;
    }
    if (!board.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
        return;
    }
    changePlayer();
}

function changePlayer() {

    if (current === "X") {
        current = "O";
    } else {
        current = "X";
    }

    const playerName = current === "X"
        ? localStorage.getItem("playerX") || "Player X"
        : localStorage.getItem("playerO") || "Player O";

    statusText.textContent = playerName + "'s turn";
}

function saveHistory(winner) {
    let history = JSON.parse(localStorage.getItem("historyList"));
    history.unshift(winner + " won the game");

    localStorage.setItem("historyList", JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("historyList"));

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}


function restart() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        board[i] = "";
        running = true;
    }
    current = "X";
    statusText.textContent = "Player X's turn";
}