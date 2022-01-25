const reset = require('./resetDOM');
const setup = require('./setup');

const initializePage = () => {
    reset(content);

    //create top bar
    const topBar = document.createElement('div');
    topBar.id = 'topbar';
    const header = document.createElement('h1');
    header.innerHTML = 'BATTLESHIP';
    topBar.appendChild(header);
    content.appendChild(topBar);

    //create players
    const info1 = createPlayer('Player 1', '#FF0000', false);
    const info2 = createPlayer('Player 2', '#0000FF', true);

    //start button
    const startWrapper = document.createElement('div');
    startWrapper.id = 'start';
    const start = document.createElement('button');
    start.innerHTML = 'START';
    startWrapper.appendChild(start);
    content.appendChild(startWrapper);

    start.addEventListener('click', () => {
        setup(info1, info2);
    })
}

function createPlayer(nameValue, colorValue, computer) {
    const container1 = document.createElement('div');
    container1.className = 'player'
    content.appendChild(container1);

    const name = document.createElement('input');
    name.value = nameValue;
    name.className = 'nameInput'
    container1.appendChild(name);

    const wrapper = document.createElement('div');
    wrapper.className = 'colorPicker'
    const color = document.createElement('input');
    color.type = 'color';
    color.value = colorValue;

    wrapper.style.background = color.value;
    name.style.color = color.value;
    
    color.addEventListener('change', () => {
        wrapper.style.background = color.value;
        name.style.color = color.value;
    });

    wrapper.appendChild(color);
    container1.appendChild(wrapper);

    if (computer) { //add computer checkbox
        const container2 = document.createElement('div');
        container2.className = "computerInput";
        const option = document.createElement('p');
        option.innerHTML = 'computer:';
        container2.appendChild(option);

        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkboxWrapper'
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkboxWrapper.appendChild(checkbox);
        container2.appendChild(checkboxWrapper);
        container1.appendChild(container2);
        return {name: name, color: color, computer: checkbox}
    } else {
        return {name: name, color: color}
    }
    
}


module.exports = initializePage;
