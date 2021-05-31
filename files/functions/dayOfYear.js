String.prototype.dayOfYear = function() {
    if (!this) return Infinity;
    let date = this.toLowerCase().trim().split(' ');
    let num = parseInt(date[0]);
    if (date[1] === 'jan' || date[1] === 'january') num += 0;
    else if (date[1] === 'feb' || date[1] === 'february') num += 31;
    else if (date[1] === 'mar' || date[1] === 'march') (date[2].isLunarYear()) ? num += 60 : num += 59;
    else if (date[1] === 'apr' || date[1] === 'april') (date[2].isLunarYear()) ? num += 91 : num += 90;
    else if (date[1] === 'may') (date[2].isLunarYear()) ? num += 121 : num += 120;
    else if (date[1] === 'jun' || date[1] === 'june') (date[2].isLunarYear()) ? num += 152 : num += 151;
    else if (date[1] === 'jul' || date[1] === 'july') (date[2].isLunarYear()) ? num += 182 : num += 181;
    else if (date[1] === 'aug' || date[1] === 'august') (date[2].isLunarYear()) ? num += 213 : num += 212;
    else if (date[1] === 'sep' || date[1] === 'september') (date[2].isLunarYear()) ? num += 244 : num += 243;
    else if (date[1] === 'okt' || date[1] === 'oktober') (date[2].isLunarYear()) ? num += 274 : num += 273;
    else if (date[1] === 'nov' || date[1] === 'november') (date[2].isLunarYear()) ? num += 305 : num += 304;
    else if (date[1] === 'dec' || date[1] === 'december') (date[2].isLunarYear()) ? num += 335 : num += 334;
    return num;
}

module.exports = {
    dayOfYear,
}