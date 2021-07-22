const isLunarYear = (str) => {
    return ((str % 4 == 0 && str % 100 != 0) || str % 400 == 0) ? true : false;
}

module.exports = {
    isLunarYear,
}