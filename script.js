//Create a  gameboard function using module which contains array board
function GameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }

    }

    const getBoard = () => board;

    const dropMarker = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === '');

        if (!availableCells.length) return;

        const lowestRow = availableCells.length-1;
        board[lowestRow][column].addMarker(player);
        console.log(lowestRow);
    }

    return { getBoard, dropMarker }
}

//creating cell function to render 2D array
function Cell() {
    let value = '';

    const addMarker = (player) => {
        value = player;
    }
    const getValue = () => value;

    return { getValue, addMarker }
}

function GameControl(playerOneName = 'PlayerOne', playerTwoName = 'PlayerTwo') {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            marker: 'X'
        },
        {
            name: playerTwoName,
            marker: 'O'
        }
    ]

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (column) => {
        board.dropMarker(column, getActivePlayer().marker);
        switchActivePlayer();
    }

    return { playRound, getActivePlayer, getBoard: board.getBoard }

}

// function which renders gameboard array
function renderGameBoard() {
    const game = GameControl()
    const boardDiv = document.querySelector('.board');
    const updateScreen = () => {

        const board = game.getBoard();

        boardDiv.textContent = '';
        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellBtn = document.createElement('button');
                cellBtn.classList.add('box');
                cellBtn.dataset.column = index;
                cellBtn.textContent = cell.getValue();
                boardDiv.appendChild(cellBtn);
            })
        });
    }

    function clickEventHandler(e) {
        const selectedColumn = e.target.dataset.column;

        if (!selectedColumn) return;

        game.playRound(selectedColumn)
        updateScreen();
    }
    boardDiv.addEventListener('click', clickEventHandler);

    updateScreen();

}
renderGameBoard()
