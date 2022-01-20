const computerPlay = require('../AI');
const Player = require('../player');

const player2 = Player('name', 'colour', 2);
computerPlay(player2);
computerPlay(player2);
computerPlay(player2);
computerPlay(player2);
test('computer always chooses legal moves i.e. after 4 plays all locations are hit', () => {
    expect(player2.board.checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: true}], [{ship: null, hit: true}, {ship: null, hit: true}]])
});