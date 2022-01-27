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

const ship2 = Ship(2);
const gameBoard3 = Gameboard(2);
gameBoard3.placeShip(ship2, 0, 1);
test('ship not placed if overlap with border x-axis', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship3 = Ship(2);
ship3.changeOrientation();
const gameBoard4 = Gameboard(2);
gameBoard4.placeShip(ship3, 0, 0);
test('ships placed correctly y-axis', () => {
    expect(gameBoard4.checkBoard()).toStrictEqual([[{ship: ship3, hit: false}, {ship: null, hit: false}], [{ship: ship3, hit: false}, {ship: null, hit: false}]])
});

const gameBoard5 = Gameboard(2);
const ship4 = Ship(2);
gameBoard5.placeShip(ship4, 0, 1);
test('ship not placed if overlap with border y-axis', () => {
    expect(gameBoard1.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship5 = Ship(2);
const ship6 = Ship(2);
const gameBoard6 = Gameboard(2);
gameBoard6.placeShip(ship5, 0, 0);
//gameBoard6.placeShip(ship6, 0, 0);
test('ship are not placed on top of eachother x-axis', () => {
    expect(gameBoard6.checkBoard()).toStrictEqual([[{ship: ship5, hit: false}, {ship: ship5, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship7 = Ship(2)
ship7.changeOrientation();
const ship8 = Ship(8);
const gameBoard7 = Gameboard(2);
gameBoard7.placeShip(ship7, 0, 0);
//gameBoard7.placeShip(ship8, 0, 0);
test('ship are not placed on top of eachother y-axis', () => {
    expect(gameBoard7.checkBoard()).toStrictEqual([[{ship: ship7, hit: false}, {ship: null, hit: false}], [{ship: ship7, hit: false}, {ship: null, hit: false}]])
});

//hit test
const gameBoard8 = Gameboard(2);
gameBoard8.receiveAttack(0, 0);
test('hit registered with no ship', () => {
    expect(gameBoard8.checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship9 = Ship(2);
const gameBoard9 = Gameboard(2);
gameBoard9.placeShip(ship9, 0, 0);
gameBoard9.receiveAttack(0, 1);
test('hit registered with ship', () => {
    expect(gameBoard9.checkBoard()).toStrictEqual([[{ship: ship9, hit: false}, {ship: ship9, hit: true}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const gameBoard10 = Gameboard(2);
gameBoard10.receiveAttack(0, 0);
gameBoard10.receiveAttack(0, 0);
test('no change if attack happens in same spot', () => {
    expect(gameBoard10.checkBoard()).toStrictEqual([[{ship: null, hit: true}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});

const ship10 = Ship(2);
const gameBoard11 = Gameboard(2);
gameBoard11.placeShip(ship4, 0, 0);
gameBoard11.receiveAttack(0, 0);
gameBoard11.receiveAttack(0, 0);
test('health of ship not affected if attack hits same spot', () => {
    expect(ship10.isSunk()).toBeFalsy();
});

//all ships sunk
const ship11 = Ship(2);
const gameBoard12 = Gameboard(2);
gameBoard12.placeShip(ship11, 0, 0);
gameBoard12.receiveAttack(0, 0);
test('all ship sunk return false if some ship locations are still not hit', () => {
    expect(gameBoard12.checkLose()).toBeFalsy();
});

const ship12 = Ship(2);
const gameboard13 = Gameboard(2);
gameboard13.placeShip(ship12, 0, 0);
gameboard13.receiveAttack(0, 0);
gameboard13.receiveAttack(0, 1);
test('all ship sunk return true if all ships are sunk', () => {
    expect(gameboard13.checkLose()).toBeTruthy();
});

//can remove placed ships
const ship13 = Ship(2);
const gameBoard14 = Gameboard(2);
gameBoard14.placeShip(ship13, 0, 0);
gameBoard14.removeShip(0, 0);
test('can remove ship by clicking on a coordinate it is in', () => {
    expect(gameBoard14.checkBoard()).toStrictEqual([[{ship: null, hit: false}, {ship: null, hit: false}], [{ship: null, hit: false}, {ship: null, hit: false}]])
});