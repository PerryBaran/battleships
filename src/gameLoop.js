const reset = require('./DOM/resetDOM');
const temp = require('./DOM/setupDOM');

const gameLoop = (player1, player2, computer) => {

    reset(content);
    const containerTop = document.createElement('div');
    containerTop.className = 'container';
    content.appendChild(containerTop);
    const gameboardP2 = document.createElement('div');     
    gameboardP2.className = 'gameboard';
    containerTop.appendChild(gameboardP2);

    const containerBottom = document.createElement('div');
    containerBottom.className = 'container';
    content.appendChild(containerBottom);
    const gameboardP1 = document.createElement('div');     
    gameboardP1.className = 'gameboard';
    containerBottom.appendChild(gameboardP1);

    temp.gameboard(gameboardP2, player2);
    temp.gameboard(gameboardP1, player1);



}

module.exports = gameLoop;