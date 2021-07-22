const { addUserDB } = require('./functions/addUserDB.js');
const { changePrefix } = require('./functions/changePrefix.js');
const { dayOfYear } = require('./functions/dayOfYear.js');
const { deleteUserDB } = require('./functions/deleteUserDB.js');
const { genshin } = require('./functions/genshin.js');
const { getID } = require('./functions/getID.js');
const { initiateNewGuild } = require('./functions/initiateNewGuild.js');
const { isLunarYear } = require('./functions/isLunarYear.js');
// const { isNumber } = require('./functions/isNumber.js');
const { ping } = require('./functions/ping.js');
const { register } = require('./functions/register.js');
const { registerBinus } = require('./functions/registerBinus.js');
const { schedule } = require('./functions/schedule.js');
const { scheduleBinus } = require('./functions/scheduleBinus.js');

module.exports = {
    addUserDB,
    changePrefix,
    dayOfYear,
    deleteUserDB,
    genshin,
    getID,
    initiateNewGuild,
    isLunarYear,
    // isNumber,
    ping,
    register,
    registerBinus,
    schedule,
    scheduleBinus,
}
