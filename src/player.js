const Gameboard = require('./gameboard');
const ShipFactory = require('./shipFactory');

const Player = (nameInput, colourInput, gameBoardSize) => {
    const board = Gameboard(gameBoardSize);             //debated hardcoding gameBoardSize as 10 to reduce inputs but settled on variable as it makes it easier to test
    const getBoard = () => board;
    const ships = ShipFactory([5, 4, 3, 3, 2]);
    const getShips = () => ships;
    const name = nameInput;
    const getName = () => name;
    const colour = colourInput;
    const getColour = () => colour;
    return {getBoard, getName, getColour, getShips}
}

module.exports = Player;