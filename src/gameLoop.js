const reset = require('./DOM/resetDOM');
const DOM = require('./DOM/gameLoopDOM');
const AI = require('./AI');


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

    function loop(player, opponent, playerContainer, opponentContainer) {
        reset(playerContainer);
        reset(opponentContainer);

        //display boards
        DOM.board(player, playerContainer);                     //only need to display players board
        const opponentBoard = DOM.board(opponent, opponentContainer);   //need to return values of opponents board for event listeners

        //event listeners
        if (player.getBoard().checkLose()) {    //check if player has lost
            const winner = DOM.winner(player, opponent, playerContainer, opponentContainer);
            if (opponent === player2) {
                winner.win.className = 'winLose top'
                winner.lose.className = 'winLose'
            } else {
                winner.win.className = 'winLose'
                winner.lose.className = 'winLose top'
            }
            
        } else if (computer && player === player2) {    //if player 2 is a computer and it's there turn
            AI.play(opponent);
            loop(opponent, player, opponentContainer, playerContainer);
        } else { //players play
            opponentBoard.forEach(cell => {
                cell.addEventListener('click', () => {
                    const board = opponent.getBoard()
                    const y = cell.dataset.y;
                    const x = cell.dataset.x;

                    if (!board.checkBoard()[y][x].hit) { //if the board has not been hit
                        board.receiveAttack(y, x);
                        loop(opponent, player, opponentContainer, playerContainer); //reset loop with player/opponent swapped
                    }
                });
            });
        }
    };
    loop(player1, player2, gameboardP1, gameboardP2);
}

module.exports = gameLoop;
