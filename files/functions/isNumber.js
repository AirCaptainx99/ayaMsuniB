String.prototype.isNumber = function() {
    return /^\d+$/.test(this);
}

module.exports = {
    isNumber();
}