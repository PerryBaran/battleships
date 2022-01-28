const Ship = require('../src/ship');

const ship1 = Ship(3);
test('get length', () => {
    expect(ship1.length()).toBe(3)
});

test('get orientation', () => {
    expect(ship1.isHorizontal()).toBeTruthy();
})

const ship2 = Ship(3);
ship2.hit();
ship2.hit()
ship2.changeOrientation();
test('ship not sunk if health remains', () => {
    expect(ship2.isSunk()).toBeFalsy();
});

test('change orientation works', () => {
    expect(ship2.isHorizontal()).toBeFalsy();
});

const ship3 = Ship(3);
ship3.hit();
ship3.hit();
ship3.hit();
test('ship sunk if health depleted', () => {
    expect(ship3.isSunk()).toStrictEqual(true);
});
