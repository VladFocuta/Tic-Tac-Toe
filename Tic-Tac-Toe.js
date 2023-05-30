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
    let playerName = player === "X" ? namesOfThePlayers[0] : namesOfThePlayers[1];
    if (player === "X") {
        message.id = "winMessageX";
    } else if (player === "O") {
        message.id = "winMessageO";
    } else if (player === "draw") {
        message.id = "drawMessage";
    }
    message.innerHTML = player === "draw" ? "The game is a Draw!" : playerName + " has won!";
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

function updateScore(player) {
    let scoreElement, scoreBoard;
    if (player === "X") {
        scoreElement = document.getElementById("xHasWon");
        scoreBoard = scoreBoardX;
    } else if (player === "O") {
        scoreElement = document.getElementById("oHasWon");
        scoreBoard = scoreBoardO;
    }
    scoreElement.innerHTML = "Score: " + scoreBoard;
}

let scoreBoardO = 0, scoreBoardX = 0;
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
            ++scoreBoardX;
            displayWinnerMessage("X");
            updateScore("X");
            return;
        } else if (cells[a].value === "O" && cells[b].value === "O" && cells[c].value === "O") {
            ++scoreBoardO;
            displayWinnerMessage("O");
            updateScore("O");
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
