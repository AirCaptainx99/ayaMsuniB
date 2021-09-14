const { Discord, MessageEmbed } = require("discord.js");
const { firebase } = require("../config.js");

const changePrefix = (database, guildIdx, msg, newPrefix) => {
    const dbRef = firebase.database().ref("/guild/" + msg.guild.id);
    dbRef.update({
        "prefix": newPrefix,
    });
    database.guildProperty.prefix[guildIdx] = newPrefix;
    console.log(guildIdx);

    msg.channel.send(new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Success!")
    .setDescription("Your prefix has been changed into " + database.guildProperty.prefix[guildIdx]));
}

module.exports = {
    changePrefix,
}