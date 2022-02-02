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

const randomTimeout = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hardPlay = (opponent) => {
    board = opponent.getBoard().checkBoard();
    //checks for lines
    for (y = 0; y < board.length; y++) {    //loop through board
        for (x = 0; x < board[i].length; x++) {
            if (containHitShip(board, y, x)) {  //if position includes ship
                if (checkLineY(board, y, x, -1)) {  //check to see if there is a line
                    opponent.getBoard().receiveAttack(y+1, x);   
                    return;
                } if (checkLineY(board, y, x, 1)) {
                    opponent.getBoard().receiveAttack(y-1, x); 
                    return;
                } if (checkLineX(board, y, x, -1)) {
                    opponent.getBoard().receiveAttack(y, x+1); 
                    return;
                } if (checkLineX(board, y, x, 1)) {
                    opponent.getBoard().receiveAttack(y, x-1);
                    return;
                }
            }
        }
    }
    //if there isn't a line checks for individual ship parts
    for (y = 0; y < board.length; y++) {    
        for (x = 0; x < board[i].length; x++) {
            if (containHitShip(board, y, x)) { 
                if (checkFree(board, y-1, x)) {
                    opponent.getBoard().receiveAttack(y-1, x);
                    return;
                } if (checkFree(board, y+1, x)) {
                    opponent.getBoard().receiveAttack(y+1, x); 
                    return;
                }if (checkFree(board, y, x-1)) {
                    opponent.getBoard().receiveAttack(y, x-1); 
                    return;
                } if (checkFree(board, y, x+1)) {
                    opponent.getBoard().receiveAttack(y, x+1); 
                    return;
                }
            }
        }
    }
    //otherwise random place
    computerPlay(opponent);
}

function containHitShip(board, y, x) {
    if (board[y][x].ship !== null       //if place contains a ship
    && board[y][x].hit                  //place is hit
    && !board[y][x].ship.isSunk()) {    //ship is not sunk
        return true
    } else {
        return false;
    }
}

function checkFree(board, y, x) {
    if (y > -1 && y < 10 && x > -1 && x < 10) {
        if (!board[y][x].hit) {
            return true
        }
    }
    return false
}

function checkLineY(board, y, x, yDifference) {
    const y2 = y + yDifference;                     //new y-coordinate
    if (y2 > -1 && y2 < 10) {                       //check in board
        if (board[y2][x].hit                        //check if space is hot
        &&  board[y2][x].ship !== null) {           //check if space contains a ship
            if (!board[y2][x].ship.isSunk()) {      //check if ship is sunk
                const y3 = y + (yDifference * -1);  //opposite y-cooridnate
                if (y3 > -1 && y3 < 10) {           //check if in board
                    if(!board[y3][x].hit) {         //check if not hit
                        return true
                    }
                }
            }
        }
    }
    return false;
}

function checkLineX(board, y, x, xDifference) {
    const x2 = x + xDifference;
    if (x2 > -1 && x2 < 10) {
        if (board[y][x2].hit
        &&  board[y][x2].ship !== null) {
            if (!board[y][x2].ship.isSunk()) {
                const x3 = x + (xDifference * -1);
                if (x3 > -1 && x3 < 10) {
                    if(!board[y][x3].hit) {
                        return true
                    }
                }   
            }
            
        }
    }
    return false;
}


exports.play = computerPlay;
exports.place = computerPlace;
exports.allShipsPlaced = allShipsPlaced
exports.timeout = randomTimeout;
exports.hardPlay = hardPlay;