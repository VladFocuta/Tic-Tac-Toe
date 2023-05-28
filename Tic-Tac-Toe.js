let cells = document.querySelectorAll("table td input");
let winningMessage = document.getElementById("messagesContainer");
let namesOfThePlayers = [];

function getPlayers() {
    for (let i = 0; i < 2; ++i) {
        namesOfThePlayers[i] = prompt("Please enter the names of the players: ");
    }
}

function addPlayers() {
    let playersContainer = document.getElementById("playersContainer");
    getPlayers();
    for (let i = 0; i < namesOfThePlayers.length; ++i) {
        let player = document.createElement("div");
        player.id = "Player" + (i + 1);
        player.innerHTML = namesOfThePlayers[i];
        if (i === 0) {
            player.className = "costum-firstPlayer";
        } else if (i === 1) {
            player.className = "costum-secondPlayer";
        }
        playersContainer.appendChild(player);
    }
}

function displayWinnerMessage(player) {
    let message = document.createElement("message");
    if (player === "X") {
        message.id = "winMessageX";
        message.innerHTML = namesOfThePlayers[0] + " has won!";
    } else if (player === "O") {
        message.id = "winMessageO";
        message.innerHTML = namesOfThePlayers[1] + " has won!";
    } else if (player === "draw") {
        message.id = "drawMessage";
        message.innerHTML = "The game is a Draw!";
    }
    winningMessage.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}

let currentPlayer = 0;
function printXAndO(event) {
    if (event.target.value === "") {
        event.target.value = currentPlayer === 0 ? "X" : "O";
        currentPlayer = (currentPlayer + 1) % 2;
    }
}

function disableFunctions() {
    document.getElementById("startButton").disabled = true;
}

let scoreBoardX = 0;
function xScore() {
    let scoreX = document.getElementById("xHasWon");
    ++scoreBoardX;
    scoreX.innerHTML = "Score: " + scoreBoardX;
}

let scoreBoardO = 0;
function oScore() {
    let scoreO = document.getElementById("oHasWon");
    ++scoreBoardO;
    scoreO.innerHTML = "Score: " + scoreBoardO;
}

function theWinner() {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combinations of winningCombinations) {
        let [a, b, c] = combinations;
        if (cells[a].value === "X" && cells[b].value === "X" && cells[c].value === "X") {
            displayWinnerMessage("X");
            xScore();
            return;
        } else if (cells[a].value === "O" && cells[b].value === "O" && cells[c].value === "O") {
            displayWinnerMessage("O");
            oScore();
            return;
        } else if (isGameCompleted()) {
            displayWinnerMessage("draw");
            return;
        }
    }
}

function isGameCompleted() {
    for (let cell of cells) {
        if (cell.value === "") {
            return false;
        }
    }
    return true;
}

function restartGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].value = cells[i].defaultValue;
    }
    disableFunctions();
    currentPlayer = 0;
}
