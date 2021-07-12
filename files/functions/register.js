let { Discord, http } = require('../core_module.js');

let register = (msg) => {
    verification(msg);
}

let verification = (msg) => {
    let options = {
        host: "ik.imagekit.io",
        path: "/adx3pkqj0s6/UserDiscordDB/" + msg.author.id + ".txt" + "?ie=" + (new Date()).getTime(),
    }

    let request = http.request(options, (res) => {
        let data = "";
        res.on('data', (chunk) => {
            data += chunk;
        })
        res.on('end', () => {
            if (data.includes("\r\n<split>\r\n")){
                msg.client.users.cache.get(msg.author.id).send(
                    (new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("Uh Oh!")
                    .setDescription("It seems that you have been registered in this bot's database, do you intend to use **!update** instead?"))
                ).then(() => {
                    return;
                });
            }
            else{
                form(msg);
            }
        })
        request.on("error", (err) => {
            console.log(err);
        });
        request.end();
    });
}

let univ = ["BINUS"];

let form = (msg) => {
    let message = '';
    for (let i = 0; i < univ.length; i++){
        message += "[" + [i+1] + "]. " + univ[i] + "\n";
    }

    message += "Choose from [1 - " + univ.length + "]";

    msg.client.users.cache.get(msg.author.id).send(
        ((new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Which University are you from?")
        .setDescription(message)))
    ).then((message) => {
        message.react('\u0031\u20E3')
        .then(() => {
            let filter = (response, user) => (
                response.emoji.name === '\u0031\u20E3') && user.id
            let collector = message.createReactionCollector(filter, {max: 1});
            
            collector.on('end', (collected, reason) => {
                
            })
        })
    }).then()
}

module.exports = {
    register,
}