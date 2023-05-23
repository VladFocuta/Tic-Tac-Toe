let cells = document.querySelectorAll("table td input");

function addPlayers() {
    let namesOfThePlayers = [];

    playerOne = prompt("Enter the name of the first player: ");
    namesOfThePlayers.push(playerOne);

    playerTwo = prompt("Enter the name of the second player: ");
    namesOfThePlayers.push(playerTwo);

    let playersContainer = document.getElementById("playersContainer");

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

function firstPlayer() {
    let winningMessage = document.getElementById("messagesContainer");
    let playerOne = document.getElementById("Player1").innerHTML;
    let message = document.createElement("message");
    message.id = "winMessageX";
    message.innerHTML = playerOne + " " + "has won!";
    winningMessage.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000)
}

function secondPlayer() {
    let winningMessage = document.getElementById("messagesContainer");
    let playerTwo = document.getElementById("Player2").innerHTML;
    let message = document.createElement("message");
    message.id = "winMessageO";
    message.innerHTML = playerTwo + " " + "has won!";
    winningMessage.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000)
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

let scoreBoardX = 0, scoreBoardO = 0;
function theWinner() {
    let scoreX = document.getElementById("xHasWon");
    let scoreO = document.getElementById("oHasWon");
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
        firstPlayer();
        ++scoreBoardX;
        scoreX.innerHTML = "Score: " + scoreBoardX;
        document.getElementById("startButton").disabled = true;
        allowInput = false;
    } else if (isGameCompleted()) {
        let drawMessage = document.getElementById("messagesContainer");
        let message = document.createElement("message");
        message.id = "drawMessage";
        message.innerHTML = "The game is a Draw!";
        drawMessage.appendChild(message);
        message.innerHTML = "The game is a Draw!";
        setTimeout(() => {
            message.remove();
        }, 1000)
        document.getElementById("startButton").disabled = true;
        allowInput = false;
    } else if (oWinner) {
        secondPlayer();
        ++scoreBoardO;
        scoreO.innerHTML = "Score: " + scoreBoardO;
        document.getElementById("startButton").disabled = true;
        allowInput = false;
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
