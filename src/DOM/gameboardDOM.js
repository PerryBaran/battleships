const gameboardDOM = (boardContainer, player) => {
    const board = [];
    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   
        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            boardContainer.appendChild(cell);

            if (player.getBoard().checkBoard()[y][x].ship !== null) {
                cell.style.background = 'red';
            }
            board.push(cell);
        };
    };
    return board; //return array of cell DOMs for event listeners
};

module.exports = gameboardDOM