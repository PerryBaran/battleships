const fleetEventListeners = (fleet, player, reset) => { 
    fleet.forEach(ship => {
        //change orientation on click
        ship.addEventListener('click', () => {
            player.getShips()[ship.id].changeOrientation();
            reset(player);
        });

        //desktop drag
        let partIndex = null; //var to pass part id to data transfer and datatransfer can't be set by mousedown
        parts = Array.from(ship.childNodes);
        parts.forEach(part => {
            part.addEventListener('mousedown', e => {
                partIndex = part.dataset.index;
            });
        });
        ship.addEventListener('dragstart', e => {
            e.dataTransfer.setData('shipID', ship.id);
            e.dataTransfer.setData('partID', partIndex);
        });
        ship.addEventListener('dragend', () => {
            reset(player)
        });

        //mobile drag
        ship.addEventListener('touchend', e => {
            const changedTouch = e.changedTouches[0];
            const cell = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
            const currentShip = harbor[ship.id];
            const y = parseInt(cell.dataset.y);
            const x = parseInt(cell.dataset.x);
            player.getBoard().placeShip(currentShip, y, x);
            reset(player);
        });
        ship.addEventListener('touchmove', e => {
            e.preventDefault()
        });
    });
}

const boardEventLiseners = (board, player, reset) => {
    board.forEach(cell => {
        //desktop drag and drop
        cell.addEventListener('dragover', e => {
            e.preventDefault();
        });
        cell.addEventListener('drop', e => {
            e.preventDefault();
            const shipID = e.dataTransfer.getData('shipID');
            const partID = e.dataTransfer.getData('partID');

            const ship = player.getShips()[shipID];
            if (ship.isHorizontal()) {
                const y = parseInt(cell.dataset.y);
                const x = parseInt(cell.dataset.x - partID);
                player.getBoard().placeShip(ship, y, x);
            } else if (!ship.isHorizontal()) {
                const y = parseInt(cell.dataset.y - partID);
                const x = parseInt(cell.dataset.x);
                player.getBoard().placeShip(ship, y, x);
            }
            reset(player);
        });

        //remove ships from board
        cell.addEventListener('click', () => {
            const y = parseInt(cell.dataset.y);
            const x = parseInt(cell.dataset.x);
            player.getBoard().removeShip(y, x);
            reset(player);
        });
    });
};

exports.ships = fleetEventListeners;
exports.board = boardEventLiseners;

