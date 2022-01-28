const Player = require('./player');
const reset = require('./DOM/resetDOM');
const gameboardDOM = require('./DOM/gameboardDOM');
const displayShips = require('./DOM/setupDOM/displayShipsDOM');
const instructionsDom = require('./DOM/setupDOM/instructionsDOM');
const continueButton = require('./DOM/setupDOM/continueDOM');

const setup = (info1, info2, computer) => {
    //create players
    const player1 = Player(info1.name.value, info1.color.value, 10);
    const player2 = Player(info2.name.value, info2.color.value, 10);

    //DOM
    reset(content);
    const container1 = document.createElement('div');
    container1.className = 'container';
    content.appendChild(container1);

    const container2 = document.createElement('div');
    container2.className = 'container';
    content.appendChild(container2);

    function setupP1(player) {
        reset(container1);
        reset(container2);
        const dock = document.createElement('dock');
        dock.className = 'harbor top';
        container1.appendChild(dock);
        const gameboard = document.createElement('div');     
        gameboard.className = 'gameboard';
        container2.appendChild(gameboard);

        instructionsDom(player, container1, 'top');

        const fleet = displayShips(dock, player); //array of ship DOM elements
        const board = gameboardDOM(gameboard, player); //array of gameboard cells 
        const contButton = continueButton(player, container1);

        //event listeners
        fleetEventListeners(fleet, player, setupP1);
        boardEventLiseners(board, player, setupP1);

        contButton.addEventListener('click', () => {
            if (computer) {
                //todo
            } else {
                setupP2(player2);
            }
        });
    };

    function setupP2(player) {
        reset(container1);
        reset(container2);
        const dock = document.createElement('dock');
        dock.className = 'harbor bottom';
        container2.appendChild(dock);
        const gameboard = document.createElement('div');     
        gameboard.className = 'gameboard';
        container1.appendChild(gameboard);

        instructionsDom(player, container2, 'bottom');

        const fleet = displayShips(dock, player); //array of ship DOM elements
        const board = gameboardDOM(gameboard, player); //array of gameboard cells 
        const contButton = continueButton(player, container2);

        fleetEventListeners(fleet, player, setupP2);
        boardEventLiseners(board, player, setupP2);

        contButton.addEventListener('click', () => {
            //todo
        });
    };

    setupP1(player1);
    
};

function fleetEventListeners(fleet, player, reset) { 
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

function boardEventLiseners(board, player, reset) {
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
}


module.exports = setup;