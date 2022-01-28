const reset = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

module.exports = reset;