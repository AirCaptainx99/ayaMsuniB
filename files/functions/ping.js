const { updateDB } = require('./updateDB.js');

const ping = function(msg){
    msg.channel.send('Pong!');
    // var test = updateDB(['hakuna', 'matatah', 'hulalala', 'oui'], 'ping.txt');
    // console.log(test);
}

module.exports = {
    ping,
}