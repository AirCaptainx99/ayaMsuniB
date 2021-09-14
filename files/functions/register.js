const { Discord } = require('../core_module.js');

const register = (database, msg) => {
    let registered = database.userList.includes(msg.author.id);

    if (registered){
        msg.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("It looks like you have been registered to our database, do you mean to use **!update** instead?")
        .setColor("RED"));
        return;
    }
    else{
        form(msg);
    }
}

const univ = ["BINUS", "UBM", "UNTAR"];

const form = (msg) => {
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
    )
    .then(async (message) => {
        let emojiList = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
        for (let i = 0; i < univ.length; i++){
            await message.react(emojiList[i]);
        }
        let filter = (response, user) => (
            emojiList.includes(response.emoji.name)) && user.id
        let collector = await message.createReactionCollector(filter);
        
        collector.on('remove' || 'collect', (response, user) => {
            switch(response.emoji.name){
                case emojiList[0]:{
                    console.log("binus");
                    break;
                }
                case emojiList[1]:{
                    console.log("ubm");
                    break;
                }
                case emojiList[2]:{
                    console.log("untar");
                    break;
                }
                default:{
                    console.log("ehe");
                }
            }
        });
    });
};

module.exports = {
    register,
}