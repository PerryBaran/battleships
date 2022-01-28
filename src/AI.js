const computerPlay = (opponent) => {
    let y = randomInteger(opponent);
    let x = randomInteger(opponent);
    while(opponent.getBoard().checkBoard()[y][x].hit === true) { //produce random values until it selects a coordinate that hasn't been hit
        y = randomInteger(opponent);
        x = randomInteger(opponent);
    }
    opponent.getBoard().receiveAttack(y, x);                     //attack opponent
}

const computerPlace = (player) => {
    const length = player.getShips().length; 
    const ships = player.getShips();    //array of ships
    const board = player.getBoard();

    let n = true
    while (n) {
        if (allShipsPlaced(ships)) {
            n = false;
        } else {
            for (i = 0; i < length; i++) {  //loop through ship array
                const random = Math.floor((Math.random() * 2) + 1); //randomly generates 1 or 2
                if (random % 2 == 0) {
                    ships[i].changeOrientation();
                }
                let y = randomInteger(player);
                let x = randomInteger(player);
                board.placeShip(ships[i], y, x);
            }
        }
    }
}

function randomInteger(player) {
    return Math.floor(Math.random() * player.getBoard().checkBoard().length); //return random number depending on size of gameboard
}

const allShipsPlaced = (ships) => {
    for (i = 0; i < ships.length; i++) {
        if (!ships[i].placed()) { //if ship is placed
            return false   
        }
    }
    return true
};



exports.play = computerPlay;
exports.place = computerPlace;
exports.allShipsPlaced = allShipsPlaced