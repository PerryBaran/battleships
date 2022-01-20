const Gameboard = require('./gameboard')

const Player = (nameInput, colourInput, gameBoardSize) => {
    const board = Gameboard(gameBoardSize);
    const name = nameInput;
    const getName = () => name;
    const colour = colourInput;
    const getColour = () => colour;
    return {board, getName, getColour}
}

module.exports = Player;