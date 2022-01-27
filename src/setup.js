const Player = require('./player');
const reset = require('./resetDOM');

const setup = (info1, info2, computer) => {
    //create players
    const player1 = Player(info1.name.value, info1.color.value, 10);
    const player2 = Player(info2.name.value, info2.color.value, 10);

    //DOM
    reset(content);
    const container1 = document.createElement('div');
    container1.className = 'container';
    content.appendChild(container1);
    instructionsDom(container1);

    const dock = document.createElement('dock');
    dock.className = 'harbor top';
    container1.appendChild(dock);

    const container2 = document.createElement('div');
    container2.className = 'container';
    content.appendChild(container2);
    const gameboard = document.createElement('div');
    gameboard.className = 'gameboard bottom';
    container2.appendChild(gameboard);

    displayShips(dock, player1, gameboard); //array of ship DOM elements
    gameboardDOM(gameboard, player1, dock); //array of gameboard cells 
};

function displayShips(shipContainer, player, boardContainer) {
    reset(shipContainer);
    let partIndex = null; //var to pass part id to data transfer and datatransfer can't be set by mousedown
    const harbor = player.getShips();

    //continue to next setup button
    if (allShipsPlaced(harbor)) {
        const container = document.createElement('div');
        container.className = 'next';
        shipContainer.appendChild(container);
        const nextPage = document.createElement('button');
        nextPage.innerHTML = 'continue';
        nextPage.className = 'continue';
        container.appendChild(nextPage);
        nextPage.addEventListener('click', () => {
            console.log('what');
        });
    }

    for (i = 0; i < harbor.length; i++) {
        if (!harbor[i].placed()) { //if ship is not placed display ship
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.id = i;
            ship.draggable = true;
            
            shipContainer.appendChild(ship);
            if (harbor[i].isHorizontal()) {
                ship.style.display = 'inline-flex';
            } else {
                ship.style.display = 'inline-block';
            };
            
            for (n = 0; n < harbor[i].length(); n++) {
                const part = document.createElement('div');
                part.className = 'shipPart';
                part.dataset.index = n;
                ship.appendChild(part);

                //dekstop drag and drop
                part.addEventListener('mousedown', e => {
                    partIndex = part.dataset.index;
                });
            };

            ship.addEventListener('click', () => {
                harbor[ship.id].changeOrientation();
                if (harbor[ship.id].isHorizontal()) {
                    ship.style.display = 'inline-flex';
                } else {
                    ship.style.display = 'inline-block';
                };
            });

            //desktop drag
            ship.addEventListener('dragstart', e => {
                e.dataTransfer.setData('shipID', ship.id);
                e.dataTransfer.setData('partID', partIndex);
            });

            ship.addEventListener('dragend', () => {
                displayShips(shipContainer, player, boardContainer); //reload ships
            });

            //mobile drag
            ship.addEventListener('touchend', e => {
                const changedTouch = e.changedTouches[0];
                const cell = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                const currentShip = harbor[ship.id];
                const y = parseInt(cell.dataset.y);
                const x = parseInt(cell.dataset.x);
                player.getBoard().placeShip(currentShip, y, x);
                gameboardDOM(boardContainer, player, shipContainer);
                displayShips(shipContainer, player, boardContainer); //reload ships
            });

            ship.addEventListener('touchmove', e => {
                e.preventDefault()
            })
        };
    };
};

function gameboardDOM(boardContainer, player, shipContainer) {
    reset(boardContainer);
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

            //drag and drop - desktop
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
                gameboardDOM(boardContainer, player, shipContainer); //reload board
            });

            //remove ships from board
            cell.addEventListener('click', () => {
                const y = parseInt(cell.dataset.y);
                const x = parseInt(cell.dataset.x);
                player.getBoard().removeShip(y, x);
                gameboardDOM(boardContainer, player, shipContainer);
                displayShips(shipContainer, player, boardContainer);
            });
        };
    };
};

function instructionsDom(container) {
    const div = document.createElement('div');
    div.className = 'instructions'
    const p1 = document.createElement('p');
    p1.innerHTML = 'drag and drop ships to place on board';
    const p2 = document.createElement('p');
    p2.innerHTML = 'click on unplaced ships to change orientation';
    const p3 = document.createElement('p');
    p3.innerHTML = 'click on placed ships to remove them from the board';
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    container.appendChild(div);
}

function allShipsPlaced(ships) {
    for (i = 0; i < ships.length; i++) {
        if (!ships[i].placed()) { //if ship is placed
            return false   
        }
    }
    return true
}


module.exports = setup;