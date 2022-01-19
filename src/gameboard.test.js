const Gameboard = require('./gameboard')
const Ship = require('./ship')

const gameBoard1 = Gameboard(2);
test('gameboard created of dimensions input x input', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship1 = Ship(2);
const gameBoard2 = Gameboard(2);
gameBoard2.placeShip(ship1, 0, 0);
test('ships placed correctly x-axis', () => {
    expect(gameBoard2.checkBoard()).toStrictEqual([[{ship: ship1, hit: false}, {ship: ship1, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const gameBoard3 = Gameboard(2);
gameBoard3.placeShip(ship1, 0, 1);
test('ship not placed if overlap with border x-axis', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship2 = Ship(2);
ship2.changeOrientation();
const gameBoard4 = Gameboard(2);
gameBoard4.placeShip(ship2, 0, 0);
test('ships placed correctly y-axis', () => {
    expect(gameBoard4.checkBoard()).toStrictEqual([[{ship: ship2, hit: false}, {ship: null, hit: false}], [{ship: ship2, hit: false}, {ship: null, hit: false}]])
});

const gameBoard5 = Gameboard(2);
gameBoard5.placeShip(ship2, 0, 1);
test('ship not placed if overlap with border y-axis', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const gameBoard6 = Gameboard(2);
gameBoard6.placeShip(ship2, 0, 0);
gameBoard6.placeShip(ship1, 0, 0);
test('ship are not placed on top of eachother x-axis', () => {
    expect(gameBoard6.checkBoard()).toStrictEqual([[{ship: ship2, hit: false}, {ship: null, hit: false}], [{ship: ship2, hit: false}, {ship: null, hit: false}]])
});

const gameBoard7 = Gameboard(2);
gameBoard7.placeShip(ship1, 0, 0);
gameBoard7.placeShip(ship2, 0, 0);
test('ship are not placed on top of eachother y-axis', () => {
    expect(gameBoard7.checkBoard()).toStrictEqual([[{ship: ship1, hit: false}, {ship: ship1, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});