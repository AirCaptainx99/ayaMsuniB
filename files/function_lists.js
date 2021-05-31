const { ping } = require('./functions/ping.js');
const { isNumber } = require('./functions/isNumber.js');
const { isLunarYear } = require('./functions/isLunarYear.js');
const { dayOfYear } = require('./functions/dayOfYear.js');

module.exports = {
    ping,
    isNumber,
    isLunarYear,
    dayOfYear,
}