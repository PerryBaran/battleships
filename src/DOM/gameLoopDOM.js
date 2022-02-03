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

const moreInfo = (container, player1, player2) => {
    const button = document.createElement('button');
    button.innerHTML = 'i';
    button.className = 'gameInfo';
    container.appendChild(button);

    const background = document.createElement('div');
    background.className = 'background';
    background.style.display = 'none';
    const wrapper = document.createElement('div');
    wrapper.className = 'moreGameInfo';
    const p1 = document.createElement('p');
    p1.innerHTML = player2.getName() + "'s board is at the top of the screen.";
    const p2 = document.createElement('p');
    p2.innerHTML = player1.getName() + "'s board is at the bottom of the screen.";
    const p3 = document.createElement('p');
    p3.innerHTML = 'Each player takes turn selecting a position on the opponents board to attack.';
    const p4 = document.createElement('p');
    p4.innerHTML = 'On the players turn, the opposing board is highlighted in their colour.';
    const p5 = document.createElement('p');
    p5.innerHTML = 'Missed shots are shown in <span style="color:grey">grey</span>, hits are shown in <span style="color:black">black</span> and a sunk ship is shown in the players colour (<span style="color:' + player1.getColour() +'">' + player1.getName() + '</span> <span style="color:' + player2.getColour() + '">' + player2.getName() + '</span>).';
    wrapper.appendChild(p1);
    wrapper.appendChild(p2);
    wrapper.appendChild(p3);
    wrapper.appendChild(p4);
    wrapper.appendChild(p5);
    background.appendChild(wrapper);
    content.appendChild(background);

    button.addEventListener('click', () => {
        background.style.display = 'block';
    });

    background.addEventListener('click', () => {
        background.style.display = 'none';
    });

}

exports.board = gameboard;
exports.winner = winner;
exports.restart = restart;
exports.cellHighlight = cellHighlight;
exports.info = moreInfo;