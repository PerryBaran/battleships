const reset = require('./DOM/resetDOM');
const DOM = require('./DOM/gameLoopDOM');
const AI = require('./AI');

const gameLoop = (player1, player2) => {

    reset(content);
    const containerTop = document.createElement('div');
    containerTop.className = 'container';
    content.appendChild(containerTop);

    const containerBottom = document.createElement('div');
    containerBottom.className = 'container';
    content.appendChild(containerBottom);

    DOM.info(containerTop, player1, player2);

    const gameboardP1 = document.createElement('div');     
    gameboardP1.className = 'gameboard';
    gameboardP1.style.border = '2px solid ' + player1.getColour();
    containerBottom.appendChild(gameboardP1);

    const gameboardP2 = document.createElement('div');     
    gameboardP2.className = 'gameboard';
    gameboardP2.style.border = '2px solid ' + player2.getColour();
    containerTop.appendChild(gameboardP2);


    function loop(player, opponent, playerContainer, opponentContainer) {
        reset(playerContainer);
        reset(opponentContainer);
        playerContainer.style.boxShadow = null;
        opponentContainer.style.boxShadow = null;

        //display boards
        DOM.board(player, playerContainer);                     //only need to display players board
        const opponentBoard = DOM.board(opponent, opponentContainer);   //need to return values of opponents board for event listeners
        
        //game conditions + listeners
        if (player.getBoard().checkLose()) {    //check if player has lost
            const winner = DOM.winner(opponent, playerContainer, opponentContainer);
            if (opponent === player2) {
                if (player2.isComputer()) { //looks nicer when playing vs computer
                    winner.lose.innerHTML = '';
                    winner.win.className = 'winLose'
                } else {
                    winner.win.className = 'winLose top'
                }
                winner.lose.className = 'winLose'
                
            } else {
                winner.win.className = 'winLose'
                winner.lose.className = 'winLose top'
                if (player2.isComputer()) {
                    winner.lose.innerHTML = '';
                };
            };

            const restart = DOM.restart();
            restart.addEventListener('click', () => {
                const initializePage = require('./initialize'); //don't know why but have to import this here for instead with the other imports for this to work
                initializePage(player1.getName(), player1.getColour(), player2.getName(), player2.getColour(), player2.isComputer(), player2.isHard());
            });
            
        } else if (player.isComputer()) {    //if player 2 is a computer and it's there turn
            opponentContainer.style.boxShadow = boxShadow + player.getColour();
            if (player.isHard()) {
                setTimeout(() => {
                AI.hardPlay(opponent);
                loop(opponent, player, opponentContainer, playerContainer);
                }, AI.timeout(500, 1500));
            } else {
                setTimeout(() => {
                AI.play(opponent);
                loop(opponent, player, opponentContainer, playerContainer);
                }, AI.timeout(500, 1500));  
            }
        } else { //players play
            DOM.cellHighlight(player, opponentBoard); //highlights position mouse is over
            opponentContainer.style.boxShadow = boxShadow + player.getColour();
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

        

        };
    };
    loop(player1, player2, gameboardP1, gameboardP2);
}

const boxShadow = '0 0 15px '



module.exports = gameLoop;
