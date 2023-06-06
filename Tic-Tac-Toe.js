let cells = document.querySelectorAll("table td input");
let winningMessage = document.getElementById("messagesContainer");
let namesOfThePlayers = [];

function getPlayers() {
    namesOfThePlayers = [prompt("Please enter the name of the first player: "), prompt("Please enter the name of the second player: ")];
}

function addPlayers() {
    let playersContainer = document.getElementById("playersContainer");
    getPlayers();
    for (let i = 0; i < namesOfThePlayers.length; ++i) {
        let playerClass = i === 0 ? "costum-firstPlayer" : "costum-secondPlayer";
        playersContainer.innerHTML += `<div id="Player${i + 1}" class="${playerClass}">${namesOfThePlayers[i]}</div>`;
    }
}

function displayWinnerMessage(player) {
    let message = document.createElement("message");
    let playerName = player === "X" ? namesOfThePlayers[0] : namesOfThePlayers[1];
    message.id = "winMessage" + player;
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

let scoreBoardO = 0, scoreBoardX = 0;
function updateScore(player) {
    let scoreElement = document.getElementById("xHasWon");
    if (player === "X") {
        scoreBoardX++;
        scoreElement.className = "costum-positionScoreX";
        scoreElement.innerHTML = "Score: " + scoreBoardX;
    } else if (player === "O") {
        scoreBoardO++;
        scoreElement.className = "costum-positionScoreO";
        scoreElement.innerHTML = "Score: " + scoreBoardO;
    }
}

function theWinner() {
    if (isGameCompleted()) {
        displayWinnerMessage("draw");
        return;
    }
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
    for (let combination of winningCombinations) {
        let cellInput = cells[combination[0]].value;
        if (cellInput && cellInput === cells[combination[1]].value && cellInput === cells[combination[2]].value) {
            displayWinnerMessage(cellInput);
            updateScore(cellInput);
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
