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

    var computer = false;
    var hard = false;
    const isComputer = () => computer;
    const isHard = () => hard;
    const computerFalse = () => computer = false;
    const computerTrue = () => computer = true;
    const hardFalse = () => hard = false;
    const hardTrue = () => hard = true;

    return {getBoard, getName, getColour, getShips, isComputer, isHard, computerFalse, computerTrue, hardFalse, hardTrue}
}

module.exports = Player;