const Player = require('./player');
const reset = require('./DOM/resetDOM');
const setupDOM = require('./DOM/setupDOM');
const AI = require('./AI');
const gameLoop = require('./gameLoop');
const listeners = require('./setupListeners');

const setup = (info1, info2, computer) => {
    //create players
    const player1 = Player(info1.name.value, info1.color.value, 10);
    const player2 = Player(info2.name.value, info2.color.value, 10);

    //DOM
    reset(content);
    const container1 = document.createElement('div');
    container1.className = 'container';
    content.appendChild(container1);

    const container2 = document.createElement('div');
    container2.className = 'container';
    content.appendChild(container2);

    function setupP1(player) {
        reset(container1);
        reset(container2);
        const dock = document.createElement('dock');
        dock.className = 'harbor top';
        container1.appendChild(dock);
        const gameboard = document.createElement('div');     
        gameboard.className = 'gameboard';
        container2.appendChild(gameboard);

        setupDOM.instructions(player, container1, 'top');

        const fleet = setupDOM.displayShips(dock, player); //array of ship DOM elements
        const board = setupDOM.gameboard(gameboard, player); //array of gameboard cells 
        const contButton = setupDOM.contButton(player, container1);

        //event listeners
        listeners.ships(fleet, player, setupP1);
        listeners.board(board, player, setupP1);

        contButton.addEventListener('click', () => {
            if (computer) {
                AI.place(player2);
                gameLoop(player1, player2, true);
            } else {
                setupP2(player2);
            }
        });
    };

    function setupP2(player) {
        reset(container1);
        reset(container2);
        const dock = document.createElement('dock');
        dock.className = 'harbor bottom';
        container2.appendChild(dock);
        const gameboard = document.createElement('div');     
        gameboard.className = 'gameboard';
        container1.appendChild(gameboard);

        setupDOM.instructions(player, container2, 'bottom');

        const fleet = setupDOM.displayShips(dock, player); //array of ship DOM elements
        const board = setupDOM.gameboard(gameboard, player); //array of gameboard cells 
        const contButton = setupDOM.contButton(player, container2);

        listeners.ships(fleet, player, setupP2);
        listeners.board(board, player, setupP2);

        contButton.addEventListener('click', () => {
            gameLoop(player1, player2, false);
        });
    };

    setupP1(player1);
    
};

module.exports = setup;