let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];

let wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

for (let i = 0; i < cells.length; i++) {
    cells[i].index = i;

    cells[i].onclick = function () {
        let index = this.index;
        if (board[index] !== "") return;

        board[index] = current;
        this.textContent = current;

        for (let j = 0; j < wins.length; j++) {
            let a = wins[j][0], b = wins[j][1], c = wins[j][2];
            if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                statusText.textContent = current + " Wins!";

                for (let k = 0; k < cells.length; k++) {
                    cells[k].disabled = true;
                }

                return;
            }
        }

        if (current === "X") {
            current = "O";
        }
        else {
            current = "X";
        }

        statusText.textContent = "Player " + current + "'s turn";
    };
}

function restart() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].disabled = false;
        board[i] = "";
    }
    current = "X";
    statusText.textContent = "Player X's turn";
}
