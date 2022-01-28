const AI = require('../src/AI');
const Player = require('../src/player');

const player2 = Player('', '', 2, '');
AI.play(player2);
AI.play(player2);
AI.play(player2);
AI.play(player2);
test('computer always chooses legal moves i.e. after 4 plays in this example all locations are hit', () => {
    expect(player2.getBoard().checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: true}], [{ship: null, hit: true}, {ship: null, hit: true}]])
});