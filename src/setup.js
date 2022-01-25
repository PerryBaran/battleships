const Player = require('./player')
const ShipFactory = require('./shipFactory')

const setup = (info1, info2) => {
    //is player 2 computer?
    const computer = info2.computer.checked;

    //create players
    const player1 = Player(info1.name.value, info1.color.value, 10);
    const player2 = Player(info2.name.value, info2.color.value, 10);
    
    //create ships
    const harbor1 = ShipFactory([5, 4, 3, 3, 2]);
    const harbor2 = ShipFactory([5, 4, 3, 3, 2]);

    //create set up page for player 1
    //on continue, if computer = false, set up page for player 2
    //if computer = true, randomly place ships for player 2
    //on continue, set up game loop
}

function placeShips(){
    //reset DOM
    //build harbor player 1
    //build gameboard player 1
    //add continue button
    //loop through with player 2 or randomly place ships
    //continue to next step
}

module.exports = setup;