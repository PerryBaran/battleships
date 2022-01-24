const ShipFactory = require('./shipFactory');
const Player = require('./player');
const renderGame = require('./DOM');

const initializeGame = () => {
    //create ships for players
    const harbor1 = ShipFactory([5, 4, 3, 3, 2]);
    const harbor2 = ShipFactory([5, 4, 3, 3, 2]);

    //create players
    const player1 = Player(player1Info.name, player1Info.color, 10);
    const player2 = Player(player2Info.name, player2Info.color, 10);
    
    //render board and ships
    renderGame(player1, harbor1, 1);
    renderGame(player2, harbor2, 2);
    
}

const player1Info = {
    name: document.getElementById('player1name'),
    color: document.getElementById('player1color')
}

const player2Info = {
    name: document.getElementById('player2name'),
    color: document.getElementById('player2color')
}

module.exports = initializeGame;
