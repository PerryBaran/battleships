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
    const isPlaced = false;
    const place = () => isPlaced = true;
    const remove = () => isPlaced = false;
    const placed = () => isPlaced;
    return {length, hit, isSunk, isHorizontal, changeOrientation, place, remove, placed}
}

module.exports = Ship;