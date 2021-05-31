String.prototype.isLunarYear = function() {
    if ((this % 4 == 0 && this % 100 != 0) || this % 400 == 0) return true;
    else return false;
}

module.exports = {
    isLunarYear,
}