const Ship = (size) => {
    const length = () => size;
    let health = size;
    let sunk = false;
    let horizontal = true;
    const hit = () => {
        health--;
        if (health === 0) {
            sunk = true;
        }
    }
    const isSunk = () => sunk;
    const isHorizontal = () => horizontal;
    const changeOrientation = () => horizontal = (horizontal ? false : true);
    return {length, hit, isSunk, isHorizontal, changeOrientation}
}

module.exports = Ship;