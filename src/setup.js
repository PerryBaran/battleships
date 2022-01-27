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
    const dock = document.createElement('dock');
    dock.className = 'harbor top';
    container1.appendChild(dock);

    displayShips(dock, player1.getShips()); //array of ship DOM elements

    const container2 = document.createElement('div');
    container2.className = 'container';
    content.appendChild(container2);
    const gameboard = document.createElement('div');
    gameboard.className = 'gameboard bottom';
    container2.appendChild(gameboard);

    gameboardDOM(gameboard, player1); //array of gameboard cells

    //drag and drop
   
    
    //on continue, if computer = false, set up page for player 2
    //if computer = true, randomly place ships for player 2
    //on continue, set up game loop
};


   
    
    
    //build gameboard player 1
    //add continue button
    //loop through with player 2 or randomly place ships
    //continue to next step

//displays unplaced ships
function displayShips(container, harbor) {
    reset(container);
    let partIndex = null; //var to pass part id to data transfer and datatransfer can't be set by mousedown
    for (i = 0; i < harbor.length; i++) {
        if (!harbor[i].placed()) { //if ship is not placed display ship
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.id = i;
            ship.draggable = true;
            
            container.appendChild(ship);
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
                displayShips(container, harbor); //reload ships
            });

            
        };
    };
};

function gameboardDOM(container, player) {
    reset(container);
    const cells = [];
    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   
        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            container.appendChild(cell);
            cells.push(cell);

            if (player.getBoard().checkBoard()[y][x].ship !== null) {
                cell.style.background = 'red';
            }

            //drag and drop
            cell.addEventListener('dragover', e => {
                e.preventDefault();
            });

            cell.addEventListener('drop', e => {
                e.preventDefault();
                const shipID = e.dataTransfer.getData('shipID');
                const partID = e.dataTransfer.getData('partID');

                const ship = player.getShips()[shipID];
                if (ship.isHorizontal()) {
                    const y = cell.dataset.y;
                    const x = cell.dataset.x - partID;
                    player.getBoard().placeShip(ship, y, x);
                } else if (!ship.isHorizontal()) {
                    const y = cell.dataset.y - partID;
                    const x = cell.dataset.x;
                    player.getBoard().placeShip(ship, y, x);
                }
                gameboardDOM(container, player); //reload board
            });
        };
    };
    return cells;
};

function dragStart(ship, partIndex) {
    e.dataTransfer.setData('shipID', ship.id);
    e.dataTransfer.setData('partID', partIndex);
}



module.exports = setup;