const Ship = require('./ship');

//used to create ships and store in an array
const ShipFactory = (array) => {            
    const harbor = [];
    for (i = 0; i < array.length; i++) {
        const ship = Ship(array[i]);
        harbor.push(ship);
    }
    return harbor;
}

module.exports = ShipFactory;