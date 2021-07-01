const { ping } = require('./functions/ping.js');
const { isNumber } = require('./functions/isNumber.js');
const { isLunarYear } = require('./functions/isLunarYear.js');
const { dayOfYear } = require('./functions/dayOfYear.js');
const { updateDB } = require('./functions/updateDB.js');
const { changePrefix } = require('./functions/changePrefix.js');
const { genshin } = require('./functions/genshin.js');
const { initiateNewGuild } = require('./functions/initiateNewGuild.js');

module.exports = {
    ping,
    isNumber,
    isLunarYear,
    dayOfYear,
    updateDB,
    changePrefix,
    genshin,
    initiateNewGuild
}
