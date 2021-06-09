const isNumber = function(str){
    return /^\d+$/.test(str);
}

module.exports = {
    isNumber,
}