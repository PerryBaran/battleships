const ShipFactory = require('../src/shipFactory');

const ships = ShipFactory([2, 4])
test('ships of correct length created and placed in array', () => {
    expect(ships[0].length()).toBe(2);
    expect(ships[1].length()).toBe(4);
})