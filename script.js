const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board];

    const placeMarker = (index, marker) => {
        if (board[index] !== "") {
            return false;
        }
        board[index] = marker;
        return true;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getBoard, placeMarker, reset };
})();


function createPlayer(name, marker) {
    return { name, marker };
}

const GameController = (function () {
    const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    let currentPlayer = players[0];
    let gameOver = false;

    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const checkWinner = (marker) => {
        const board = Gameboard.getBoard();
        return winningLines.some((line) => line.every((index) => board[index] === marker));
    };

    const isTie = () => Gameboard.getBoard().every((cell) => cell !== "");

    const playRound = (index) => {
        if (gameOver) {
            return "The game is over. Start a new game.";
        }
        if (!Gameboard.placeMarker(index, currentPlayer.marker)) {
            return "That square is taken. Pick another one.";
        }
        if (checkWinner(currentPlayer.marker)) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        }
        if (isTie()) {
            gameOver = true;
            return "It's a tie!";
        }
        switchPlayer();
        return `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    };

    const getCurrentPlayer = () => currentPlayer;

    const newGame = () => {
        Gameboard.reset();
        currentPlayer = players[0];
        gameOver = false;
    };

    return { playRound, getCurrentPlayer, newGame };
})();


const DisplayController = (function () {
    const boardElement = document.querySelector(".board");
    const statusElement = document.querySelector(".status");
    const restartButton = document.querySelector(".restart-btn");

    const showTurn = () => {
        const player = GameController.getCurrentPlayer();
        statusElement.textContent = `${player.name}'s turn (${player.marker})`;
    };

    const render = () => {
        boardElement.textContent = "";
        Gameboard.getBoard().forEach((marker, index) => {
            const cell = document.createElement("button");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.textContent = marker;
            boardElement.appendChild(cell);
        });
    };

    boardElement.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) {
            return;
        }
        statusElement.textContent = GameController.playRound(Number(index));
        render();
    });

    restartButton.addEventListener("click", () => {
        GameController.newGame();
        showTurn();
        render();
    });

    showTurn();
    render();

    return { render };
})();