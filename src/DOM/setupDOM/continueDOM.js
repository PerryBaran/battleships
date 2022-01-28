const continueButton = (player, container) => {
    const harbor = player.getShips();
    const nextPage = document.createElement('button');
    if (allShipsPlaced(harbor)) {
        const wrapper = document.createElement('div');
        wrapper.className = 'next';
        container.appendChild(wrapper);
        nextPage.innerHTML = 'continue';
        nextPage.className = 'continue';
        wrapper.appendChild(nextPage);
    };
    return nextPage
};

function allShipsPlaced(ships) {
    for (i = 0; i < ships.length; i++) {
        if (!ships[i].placed()) { //if ship is placed
            return false   
        }
    }
    return true
};

module.exports = continueButton;