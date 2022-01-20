const Gameboard = require('../gameboard')
const Ship = require('../ship')

//gameboard test
const gameBoard1 = Gameboard(2);
test('gameboard created of dimensions input x input', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

//ship placement
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

//hit test
const gameBoard8 = Gameboard(2);
gameBoard8.receiveAttack(0, 0);
test('hit registered with no ship', () => {
    expect(gameBoard8.checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship3 = Ship(2);
const gameBoard9 = Gameboard(2);
gameBoard9.placeShip(ship3, 0, 0);
gameBoard9.receiveAttack(0, 1);
test('hit registered with ship', () => {
    expect(gameBoard9.checkBoard()).toStrictEqual([[{ship: ship3, hit: false}, {ship: ship3, hit: true}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const gameBoard10 = Gameboard(2);
gameBoard10.receiveAttack(0, 0);
gameBoard10.receiveAttack(0, 0);
test('no change if attack happens in same spot', () => {
    expect(gameBoard10.checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship4 = Ship(2);
const gameBoard11 = Gameboard(2);
gameBoard11.placeShip(ship4, 0, 0);
gameBoard11.receiveAttack(0, 0);
gameBoard11.receiveAttack(0, 0);
test('health of ship not affected if attack hits same spot', () => {
    expect(ship4.isSunk()).toBe(false)
});

//all ships sunk
const ship5 = Ship(2);
const gameBoard12 = Gameboard(2);
gameBoard12.placeShip(ship5, 0, 0);
gameBoard12.receiveAttack(0, 0);
test('all ship sunk return false if some ship locations are still not hit', () => {
    expect(gameBoard12.checkLose()).toBe(false)
});

const ship6 = Ship(2);
const gameboard13 = Gameboard(2);
gameboard13.placeShip(ship6, 0, 0);
gameboard13.receiveAttack(0, 0);
gameboard13.receiveAttack(0, 1);
test('all ship sunk return true if all ships are sunk', () => {
    expect(gameboard13.checkLose()).toBe(true)
});