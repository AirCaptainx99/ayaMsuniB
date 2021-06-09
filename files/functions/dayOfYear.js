const { isLunarYear } = require('./isLunarYear.js');

const dayOfYear = function(str){
    if (!str) return Infinity;
    let date = str.toLowerCase().trim().split(' ');
    let num = parseInt(date[0]);
    if (date[1] === 'jan' || date[1] === 'january') num += 0;
    else if (date[1] === 'feb' || date[1] === 'february') num += 31;
    else if (date[1] === 'mar' || date[1] === 'march') (isLunarYear(date[2])) ? num += 60 : num += 59;
    else if (date[1] === 'apr' || date[1] === 'april') (isLunarYear(date[2])) ? num += 91 : num += 90;
    else if (date[1] === 'may') (isLunarYear(date[2])) ? num += 121 : num += 120;
    else if (date[1] === 'jun' || date[1] === 'june') (isLunarYear(date[2])) ? num += 152 : num += 151;
    else if (date[1] === 'jul' || date[1] === 'july') (isLunarYear(date[2])) ? num += 182 : num += 181;
    else if (date[1] === 'aug' || date[1] === 'august') (isLunarYear(date[2])) ? num += 213 : num += 212;
    else if (date[1] === 'sep' || date[1] === 'september') (isLunarYear(date[2])) ? num += 244 : num += 243;
    else if (date[1] === 'oct' || date[1] === 'october') (isLunarYear(date[2])) ? num += 274 : num += 273;
    else if (date[1] === 'nov' || date[1] === 'november') (isLunarYear(date[2])) ? num += 305 : num += 304;
    else if (date[1] === 'dec' || date[1] === 'december') (isLunarYear(date[2])) ? num += 335 : num += 334;
    return num;
}

module.exports = {
    dayOfYear,
}