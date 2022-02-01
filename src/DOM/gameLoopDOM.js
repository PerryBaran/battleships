const gameboard = (player, boardContainer) => {
    const cellArray = [];

    const board = player.getBoard().checkBoard();
    for (y = 0; y < board.length; y++) {   
        for (x = 0; x < board[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            boardContainer.appendChild(cell);

            const ship = board[y][x].ship;

            //if the ship is sunk
            if (ship === null) { //if cell doesn't contain a ship
                if (board[y][x].hit) {  //if cell is hit
                    cell.style.background = 'grey';
                }
            } else {    //cell contains ship
                if (ship.isSunk()) {
                    cell.style.background = player.getColour();
                } else if (board[y][x].hit) {
                    cell.style.background = 'black';
                }
            }
            
            cellArray.push(cell);
        };
    };
    return cellArray; //return array of cell DOMs for event listeners
};

const winner = (opponent, playerContainer, opponentContainer) => {
    //opponent always wins as winner is checked at beginning of players turn
    const win = document.createElement('p');
    win.innerHTML = opponent.getName() + ' wins';
    win.style.color = opponent.getColour();

    const lose = document.createElement('p');
    lose.innerHTML = opponent.getName() + ' wins';
    lose.style.color = opponent.getColour();

    opponentContainer.appendChild(win);
    playerContainer.appendChild(lose);

    return {win: win, lose: lose};
};

const restart = () => {
    const button = document.createElement('button');
    button.innerHTML = 'RESET';
    button.className = 'restart';

    content.appendChild(button);

    return button;
}

const cellHighlight = (player, board) => {
    board.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cell.style.boxShadow = '0 0 15px ' + player.getColour();
            cell.style.zIndex = '5';
        });
        cell.addEventListener('mouseout', () => {
            cell.style.boxShadow = null;
            cell.style.zIndex = '2';
        });
    });
};

exports.board = gameboard;
exports.winner = winner;
exports.restart = restart;
exports.cellHighlight = cellHighlight;