const Gameboard = require('./gameboard')

const Player = (nameInput, colourInput, gameBoardSize, ships) => {
    const board = Gameboard(gameBoardSize);             //debated hardcoding gameBoardSize as 10 to reduce inputs but settled on variable as it makes it easier to test

    
    
    const name = nameInput;
    const getName = () => name;
    const colour = colourInput;
    const getColour = () => colour;
    return {board, getName, getColour}
}

module.exports = Player;