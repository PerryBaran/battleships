const computerPlay = (opponent) => {
    let y = randomInteger(opponent);
    let x = randomInteger(opponent);
    while(opponent.board.checkBoard()[y][x].hit === true) { //produce random values until it selects a coordinate that hasn't been hit
        y = randomInteger(opponent);
        x = randomInteger(opponent);
    }
    opponent.board.receiveAttack(y, x);                     //attack opponent
}

function randomInteger(player) {
    return Math.floor(Math.random() * player.board.checkBoard().length); //return random number depending on size of gameboard
}

module.exports = computerPlay;