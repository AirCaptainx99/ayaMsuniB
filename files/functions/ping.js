// const { Discord } = require('../data/core_module.js');

// const msg = Discord;

const ping = function(msg){
    msg.channel.send('Pong!');
}

module.exports = {
    ping,
}