const instructionsDom = (player, container, position) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'infoWrapper ' + position

    //create a container for name and button
    const div = document.createElement('div');
    div.className = 'instructions';

    const playersSetup = document.createElement('p');
    playersSetup.innerHTML = player.getName() + " setup";
    playersSetup.style.color = player.getColour();
    div.appendChild(playersSetup);

    const moreInfo = document.createElement('button');
    moreInfo.innerHTML = 'i';
    div.appendChild(moreInfo);
    wrapper.appendChild(div);

    const info = document.createElement('div');
    info.className = 'info';
    info.style.display = 'none';
    const p1 = document.createElement('p');
    p1.innerHTML = 'drag and drop ships to place on board';
    const p2 = document.createElement('p');
    p2.innerHTML = 'click on unplaced ships to change orientation';
    const p3 = document.createElement('p');
    p3.innerHTML = 'click on placed ships to remove them from the board';
    info.appendChild(p1);
    info.appendChild(p2);
    info.appendChild(p3);
    wrapper.appendChild(info);
    container.appendChild(wrapper);

    moreInfo.addEventListener('click', () => {
        if (info.style.display === 'none') {
            info.style.display = 'block';
        } else {
            info.style.display = 'none';
        };
    });
};

module.exports = instructionsDom;