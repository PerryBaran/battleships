const computerPlay = require('../AI');
const Player = require('../player');

const player2 = Player('', '', 2, '');
computerPlay(player2);
computerPlay(player2);
computerPlay(player2);
computerPlay(player2);
test('computer always chooses legal moves i.e. after 4 plays in this example all locations are hit', () => {
    expect(player2.getBoard().checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: true}], [{ship: null, hit: true}, {ship: null, hit: true}]])
});