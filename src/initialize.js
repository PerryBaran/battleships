const reset = require('./DOM/resetDOM');
const setup = require('./setup');

const initializePage = (player1Name, player1Colour, player2Name, player2Colour) => {
    reset(content);

    //create top bar
    const topBar = document.createElement('div');
    topBar.id = 'topbar';
    const header = document.createElement('h1');
    header.innerHTML = 'BATTLESHIP';
    topBar.appendChild(header);
    content.appendChild(topBar);

    //create players
    const info1 = createPlayer(player1Name, player1Colour);
    const info2 = createPlayer(player2Name, player2Colour);
    
    //player 2 is computer option
    let computer = true;

    const container = document.createElement('div');
    container.className = "computerInput";
    const option = document.createElement('button');
    option.innerHTML = 'player vs computer';
    container.appendChild(option);
    content.appendChild(container);

    option.onclick = () => {
        if (computer) {
            computer = false;
            option.innerHTML = 'player vs player'
        } else {
            computer = true;
            option.innerHTML = 'player vs computer';
        }
    }
   
    //start button
    const startWrapper = document.createElement('div');
    startWrapper.id = 'start';
    const start = document.createElement('button');
    start.innerHTML = 'START';
    startWrapper.appendChild(start);
    content.appendChild(startWrapper);

    start.addEventListener('click', () => {
        setup(info1, info2, computer);
    })
}

function createPlayer(nameValue, colorValue) {
    const container = document.createElement('div');
    container.className = 'player'
    content.appendChild(container);

    const name = document.createElement('input');
    name.value = nameValue;
    name.className = 'nameInput'
    name.maxLength = '9';
    container.appendChild(name);

    const wrapper = document.createElement('div');
    wrapper.className = 'colorPicker'
    const color = document.createElement('input');
    color.type = 'color';
    color.value = colorValue;

    wrapper.style.background = color.value;
    name.style.color = color.value;
    
    color.addEventListener('input', () => {
        wrapper.style.background = color.value;
        name.style.color = color.value;
    });

    wrapper.appendChild(color);
    container.appendChild(wrapper);

    
    return {name: name, color: color}
}
    



module.exports = initializePage;
