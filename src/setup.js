const Player = require('./player')
const ShipFactory = require('./shipFactory')
const reset = require('./resetDOM')

const setup = (info1, info2, computer) => {
    //create players
    const player1 = Player(info1.name.value, info1.color.value, 10);
    const player2 = Player(info2.name.value, info2.color.value, 10);

    //create ships
    const harbor1 = ShipFactory([5, 4, 3, 3, 2]);
    const harbor2 = ShipFactory([5, 4, 3, 3, 2]);
    harbor1[0].changeOrientation();
    
    //DOM
    reset(content);
 
    const container1 = document.createElement('div');
    container1.className = 'container';
    content.appendChild(container1)

    const dock = document.createElement('dock');
    dock.className = 'harbor top';
    container1.appendChild(dock);

    displayShips(dock, harbor1);

    const container2 = document.createElement('div');
    container2.className = 'container';
    content.appendChild(container2)

    const gameboard = document.createElement('div');
    gameboard.className = 'gameboard bottom';
    container2.appendChild(gameboard)

    gameboardDOM(gameboard, player1)
    
    
    //on continue, if computer = false, set up page for player 2
    //if computer = true, randomly place ships for player 2
    //on continue, set up game loop
}


   
    
    
    //build gameboard player 1
    //add continue button
    //loop through with player 2 or randomly place ships
    //continue to next step

//displays unplaced ships
function displayShips(container, harbor) {
    reset(container);
    for (i = 0; i < harbor.length; i++) {
        if (!harbor[i].placed()) { //if ship is not placed display ship
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.dataset.index = i;
            container.appendChild(ship);
            if (harbor[i].isHorizontal()) {
                ship.style.display = 'inline-flex';
            } else {
                ship.style.display = 'inline-block';
            }
            ship.addEventListener('click', () => {
                harbor[ship.dataset.index].changeOrientation();
                displayShips(container, harbor)
                
            })
            for (n = 0; n < harbor[i].length(); n++) {
                const part = document.createElement('div');
                part.className = 'shipPart';
                ship.appendChild(part);
            }
        }
    }
}

function gameboardDOM(container, player) {
    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   
        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.y = y; //y coordinate
            cell.dataset.x = x; //x coordinate
            container.appendChild(cell);
        }
    }
}



module.exports = setup;