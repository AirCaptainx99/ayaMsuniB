let { Imagekit, Discord, http } = require('../core_module.js');

let changePrefix = (msg, pref) => {
    getDatabase(msg, pref);
}

let getDatabase = (msg, pref) => {
    let data = '';
    let options = {
        host: "ik.imagekit.io",
        path: "/adx3pkqj0s6/GuildDiscordDB/" + msg.guild.id + ".txt" + "?ie=" + (new Date()).getTime(),
    }
    let request = http.request(options, (res) => {
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            change(msg, pref, data);
        });
    });
    request.on('error', (err) => {
        console.log(err);
    })
    request.end();
}

let change = (msg, pref, data) => {
    let oldDB = data.split('\r\n<split>\r\n');
    let newDB = pref + '\r\n<split>\r\n' + oldDB[1];

    update(msg, pref, newDB);
}

let update = (msg, pref, data) => {
    let imagekit = new Imagekit({
        publicKey : "public_BY4rH/oQzUDkghcLA2LVPL0ex7g=",
        privateKey : "private_hsWNeK5l9+wuOS3uoXQ0rKeOcwg=",
        urlEndpoint : "https://ik.imagekit.io/adx3pkqj0s6",
    });

    imagekit.upload({
        file: Buffer.from(data),
        fileName: msg.guild.id + '.txt',
        useUniqueFileName: false,
        folder: '/GuildDiscordDB/',
    }, (error, res) => {
        if (error){
            console.log(error);
        }
        else{
            console.log(res);
        }
    });

    let message = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setDescription("The prefix has been changed into " + pref);

    msg.channel.send(message);
}

module.exports = {
    changePrefix,
}