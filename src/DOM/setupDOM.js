const AI = require('../AI');

const instructionsDom = (player, container, position) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'infoWrapper ' + position

    //create a container for name and button
    const shownInfoWrapper = document.createElement('div');
    shownInfoWrapper.className = 'instructions';

    const playersSetup = document.createElement('p');
    playersSetup.innerHTML = player.getName() + " setup";
    playersSetup.style.color = player.getColour();
    shownInfoWrapper.appendChild(playersSetup);

    const moreInfo = document.createElement('button');
    moreInfo.innerHTML = 'i';
    shownInfoWrapper.appendChild(moreInfo);
    
    const hiddenInfoWrapper = document.createElement('div');
    hiddenInfoWrapper.className = 'info';
    hiddenInfoWrapper.style.display = 'none';
    const p1 = document.createElement('p');
    p1.innerHTML = 'drag and drop ships to place on board';
    const p2 = document.createElement('p');
    p2.innerHTML = 'click on unplaced ships to change orientation';
    const p3 = document.createElement('p');
    p3.innerHTML = 'click on placed ships to remove them from the board';
    hiddenInfoWrapper.appendChild(p1);
    hiddenInfoWrapper.appendChild(p2);
    hiddenInfoWrapper.appendChild(p3);
    
    if (position === 'top') {
        wrapper.appendChild(shownInfoWrapper);
        wrapper.appendChild(hiddenInfoWrapper);
    } else {
        wrapper.appendChild(hiddenInfoWrapper);
        wrapper.appendChild(shownInfoWrapper);
    }
    container.appendChild(wrapper);

    moreInfo.addEventListener('click', () => {
        if (hiddenInfoWrapper.style.display === 'none') {
            hiddenInfoWrapper.style.display = 'block';
        } else {
            hiddenInfoWrapper.style.display = 'none';
        };
    });
};

const displayShips = (shipContainer, player) => {
    const harbor = player.getShips();
    const ships = [];
    for (i = 0; i < harbor.length; i++) {
        if (!harbor[i].placed()) { //if ship is not placed display ship
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.id = i;
            ship.draggable = true;
            
            shipContainer.appendChild(ship);

            if (harbor[i].isHorizontal()) { //style ships depending on orienation
                ship.style.display = 'inline-flex';
            } else {
                ship.style.display = 'inline-block';
            };
            
            for (n = 0; n < harbor[i].length(); n++) {
                const part = document.createElement('div');
                part.className = 'shipPart';
                part.dataset.index = n;
                ship.appendChild(part);
            };

            ships.push(ship);
        };
    };
    return ships; //return array of ship DOMs for event listeners
};

const gameboard = (boardContainer, player) => {
    const board = [];
    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   
        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            boardContainer.appendChild(cell);

            if (player.getBoard().checkBoard()[y][x].ship !== null) {
                cell.style.background = player.getColour();
            }
            board.push(cell);
        };
    };
    return board; //return array of cell DOMs for event listeners
};

const continueButton = (player, container) => {
    const harbor = player.getShips();
    const nextPage = document.createElement('button');
    if (AI.allShipsPlaced(harbor)) {
        const wrapper = document.createElement('div');
        wrapper.className = 'next';
        container.appendChild(wrapper);
        nextPage.innerHTML = 'continue';
        nextPage.className = 'continue';
        wrapper.appendChild(nextPage);
    };
    return nextPage
};

exports.instructions = instructionsDom;
exports.gameboard = gameboard;
exports.displayShips = displayShips;
exports.contButton = continueButton;