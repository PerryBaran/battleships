const displayShips = (shipContainer, player) => {
    const harbor = player.getShips();
    const ships = [];
    for (i = 0; i < harbor.length; i++) {
        if (!harbor[i].placed()) { //if ship is not placed display ship
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.id = i;
            ship.draggable = true;
            
            shipContainer.appendChild(ship);

            if (harbor[i].isHorizontal()) { //style ships depending on orienation
                ship.style.display = 'inline-flex';
            } else {
                ship.style.display = 'inline-block';
            };
            
            for (n = 0; n < harbor[i].length(); n++) {
                const part = document.createElement('div');
                part.className = 'shipPart';
                part.dataset.index = n;
                ship.appendChild(part);
            };

            ships.push(ship);
        };
    };
    return ships; //return array of ship DOMs for event listeners
};

module.exports = displayShips;