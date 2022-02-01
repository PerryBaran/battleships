const reset = require('./DOM/resetDOM');
const DOM = require('./DOM/gameLoopDOM');
const AI = require('./AI');

const gameLoop = (player1, player2, computer) => {

    reset(content);
    const containerTop = document.createElement('div');
    containerTop.className = 'container';
    content.appendChild(containerTop);

    const containerBottom = document.createElement('div');
    containerBottom.className = 'container';
    content.appendChild(containerBottom);

    const player1Name = document.createElement('p');
    player1Name.innerHTML = player1.getName();
    player1Name.style.color = player1.getColour();
    player1Name.className = 'name p1';
    content.appendChild(player1Name);

    const player2Name = document.createElement('p');
    player2Name.innerHTML = player2.getName();
    player2Name.style.color = player2.getColour();
    player2Name.className = 'name p2';
    content.appendChild(player2Name);

    function loop(player, opponent, playerContainer, opponentContainer) {
        reset(playerContainer);
        reset(opponentContainer);

        const playerBoardContainer = document.createElement('div');     
        playerBoardContainer.className = 'gameboard';
        playerContainer.appendChild(playerBoardContainer);

        const opponentBoardContainer = document.createElement('div');     
        opponentBoardContainer.className = 'gameboard';
        opponentContainer.appendChild(opponentBoardContainer);

        

        //display boards
        DOM.board(player, playerBoardContainer);                     //only need to display players board
        const opponentBoard = DOM.board(opponent, opponentBoardContainer);   //need to return values of opponents board for event listeners

        //game conditions + listeners
        if (player.getBoard().checkLose()) {    //check if player has lost
            const winner = DOM.winner(opponent, playerContainer, opponentContainer);
            if (opponent === player2) {
                winner.win.className = 'winLose top'
                winner.lose.className = 'winLose'
            } else {
                winner.win.className = 'winLose'
                winner.lose.className = 'winLose top'
            }

            const restart = DOM.restart();
            restart.addEventListener('click', () => {
                const initializePage = require('./initialize'); //don't know why but have to import this here for instead with the other imports for this to work
                initializePage(player1.getName(), player1.getColour(), player2.getName(), player2.getColour());
            });
            
        } else if (computer && player === player2) {    //if player 2 is a computer and it's there turn
            opponentBoardContainer.style.boxShadow = '0 0 10px ' + player.getColour();
            setTimeout(() => {
                AI.play(opponent);
                loop(opponent, player, opponentContainer, playerContainer);
            }, 800);
        } else { //players play
            opponentBoardContainer.style.boxShadow = '0 0 10px ' + player.getColour();
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
    loop(player1, player2, containerBottom, containerTop);
}



module.exports = gameLoop;
