const Gameboard = (size) => {
    const board = createArray(size); //create 2D array to store coordinates of size x size grid
    const checkBoard = () => board;

    const placeShip = (battleShip, y, x) => {
        if ((battleShip.isHorizontal()) &&  //check ship orientation, horizontal
        (x + battleShip.length() <= size) && //check ship doesn't overflow border
        (locationsFreeX(battleShip, y, x, board)) &&   //check all spaces are free
        (!battleShip.placed())) {  //check ship hasn't already been placed
            for (i = x; i < (x + battleShip.length()); i++) {
                board[y][i].ship = battleShip;
                battleShip.place();
            }
        } else if ((!battleShip.isHorizontal()) && //vertical
        (y + battleShip.length() <= size) && //check ship doesn't overflow border
        (locationsFreeY(battleShip, y, x, board)) &&   //check all spaces are free
        (!battleShip.placed())) {  //check ship hasn't already been placed
            for (i = y; i < (y + battleShip.length()); i++) {
                board[i][x].ship = battleShip;
                battleShip.place();
            };
        };
    };

    const removeShip = (y, x) => {
        if (board[y][x].ship !== null) { //if the board contains a ship at position y x
            const ship = board[y][x].ship;
            for (i = 0; i < board.length; i++) {
                for (n = 0; n < board[i].length; n++) {
                    if (board[i][n].ship == ship) {
                        board[i][n].ship.remove();
                        board[i][n].ship = null;
                    };
                };
            };
        };
    };

    const receiveAttack = (y, x) => {
        if (board[y][x].hit === false) {    //check if coordinate has been hit
            if (board[y][x].ship === null) {    // check if coordinate doesn't contain a ship
                board[y][x].hit = true;
            } else {
                board[y][x].ship.hit();
                board[y][x].hit = true;
            }
        }
    }

    const checkLose = () => {
        for (y = 0; y < size; y++) {
            for (x = 0; x < size; x++) {
                if (board[y][x].ship !== null && board[y][x].hit === false) { //if any position contains a ship section that has not been hit
                    return false
                }
            }
        }
        return true;
    }
    return {checkBoard, placeShip, receiveAttack, checkLose, removeShip};
}

function createArray(size) {
    const outerArray = [];
    for (i = 0; i < size; i++) {
        const innerArray = [];
        for (n = 0; n < size; n++) {
            const object = {ship: null, hit: false};
            innerArray.push(object);
        } outerArray.push(innerArray)
    }
    return outerArray;
}

function locationsFreeX(ship, y, x, board) {  
    if (y < 0 || x < 0) {
        return false;
    }
    const length = ship.length();
    for (i = x; i < (x + length); i++) {
        if (board[y][i].ship !== null) { //if where the ship is going to be placed already contains a ship
            return false
        }
    } return true
}

function locationsFreeY(ship, y, x, board) {
    if (y < 0 || x < 0) {
        return false;
    }
    const length = ship.length();
    for (i = y; i < (y + length); i++) {
        if (board[i][x].ship !== null) {
            return false
        }
    } return true
}

module.exports = Gameboard