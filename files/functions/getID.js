let { Discord } = require('../core_module.js');

let getID = (msg) => {
    let message = new Discord.MessageEmbed();
    if (msg.guild.id){
        message
        .setColor("WHITE")
        .setDescription("User ID: " + msg.author.id + "\n" + "Server ID: " + msg.guild.id);
        
    }
    else{
        message
        .setColor("WHITE")
        .setDescription("User ID: " + msg.author.id);
    }
    msg.channel.send(message);
}

module.exports = {
    getID,
}