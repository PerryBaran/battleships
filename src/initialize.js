const reset = require('./DOM/resetDOM');
const setup = require('./setup');

const initializePage = (player1Name, player1Colour, player2Name, player2Colour, p2Computer, p2Hard) => {
    reset(content);

    //create top bar
    const topBar = document.createElement('div');
    topBar.id = 'topbar';
    const header = document.createElement('h1');
    header.innerHTML = 'BATTLESHIP';
    topBar.appendChild(header);
    content.appendChild(topBar);

    const bottomBar = document.createElement('p');
    bottomBar.id = 'bottombar';
    bottomBar.innerHTML = 'Created by Perry Baran';
    content.appendChild(bottomBar);
    
    const container1 = document.createElement('div');
    container1.className = 'player'
    content.appendChild(container1);

    const container2 = document.createElement('div');
    container2.className = 'player'
    content.appendChild(container2);

    //create players
    const info1 = createPlayer(player1Name, player1Colour, container1);
    const info2 = createPlayer(player2Name, player2Colour, container2);

    //p2 hard
    let computer = p2Computer;
    let hard = p2Hard;
        
    const computerButton = document.createElement('button');
    computerButton.className = 'swap computer'
    if (computer) {
        computerButton.innerHTML = 'computer';
    } else {
        computerButton.innerHTML = 'player';
    }
    container2.appendChild(computerButton);

    const hardButton = document.createElement('button');
    hardButton.className = 'swap hard';
    if (hard) {
        hardButton.innerHTML = 'hard';
    } else {
        hardButton.innerHTML = 'easy';
    }
    if (!computer) {
        hardButton.style.opacity = 0.5;
        hardButton.style.cursor = 'default';
    }
    container2.appendChild(hardButton);

    computerButton.addEventListener('click', () => {
        if (computer) {
            computer = false;
            computerButton.innerHTML = 'player';
            hardButton.style.opacity = 0.5;
            hardButton.style.cursor = 'default';
        } else {
            computer = true;
            computerButton.innerHTML = 'computer';
            hardButton.style.opacity = 1;
            hardButton.style.cursor = 'pointer';
        }
    });

    hardButton.addEventListener('click', () => {
        if (computer) {
            if (hard) {
                hard = false;
                hardButton.innerHTML = 'easy'
            } else {
                hard = true;
                hardButton.innerHTML = 'hard'
            }  
        }  
    });
   
    //start button
    const startWrapper = document.createElement('div');
    startWrapper.id = 'start';
    const start = document.createElement('button');
    start.innerHTML = 'START';
    startWrapper.appendChild(start);
    content.appendChild(startWrapper);

    start.addEventListener('click', () => {
        setup(info1, info2, computer, hard);
    })
}

function createPlayer(nameValue, colorValue, container) {
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
