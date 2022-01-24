const renderGame = (player, harbor, id) => {
    const board = document.getElementById('player' + id + 'board');
    reset(board);
    //render gameboard
    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   
        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            board.appendChild(cell);
        }
    }
    //render ships
    const dock = document.getElementById('player' + id + 'ships')
    for (i = 0; i < harbor.length; i++) {
        const ship = document.createElement('div');
        ship.className = 'ship';
        ship.dataset.id = i;
        for (n = 0; n < harbor[i].length(); n++) {
            const shipPart = document.createElement('div');
            shipPart.className = 'shipPart';
            ship.appendChild(shipPart);
        }
        dock.appendChild(ship);
    }
    //loop through array
    //create div
    //reference ships in div?
    //inside div append as many divs and ship length
}

function reset(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

module.exports = renderGame;