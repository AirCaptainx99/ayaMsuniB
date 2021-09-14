const { firebase } = require('../config.js');
const { Discord } = require('discord.js');

const initiateNewGuild = (guild) => {
    const memberId = guild.members.cache.filter(x => !x.user.bot).map(x => x.user.id).sort();
    refDB = firebase.database().ref("/guild/" + guild.id);
    refDB.set({
        "prefix": "!",
        "members": memberId,
    });
};

module.exports = {
    initiateNewGuild,
}