let cells = document.querySelectorAll("table td input");
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
    let winningMessage = document.getElementById("messagesContainer");
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

function printX(event) {
    event.target.value = "X";
}

function printO(event) {
    event.target.value = "O";
}

let isX = true, allowInput = true;
function printXAndO(e) {
    if (allowInput) {
        if (isX) {
            printX(e);
            isX = false;
        } else {
            printO(e);
            isX = true;
        }
    }
}

function disableFunctions() {
    document.getElementById("startButton").disabled = true;
    allowInput = false;
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
    let xWinner = false, oWinner = false;
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
            xWinner = true;
            break;
        } else if (cells[a].value === "O" && cells[b].value === "O" && cells[c].value === "O") {
            oWinner = true;
            break;
        }
    }
    if (xWinner) {
        xScore();
        displayWinnerMessage("X");
        disableFunctions();
    } else if (isGameCompleted()) {
        displayWinnerMessage("draw");
        disableFunctions();
    } else if (oWinner) {
        oScore();
        displayWinnerMessage("O");
        disableFunctions();
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
    isX = true;
    allowInput = true;
    for (let i = 0; i < cells.length; i++) {
        cells[i].value = cells[i].defaultValue;
    }
}
