const { MessageEmbed, TextChannel, Guild, Emoji, GuildEmoji } = require('discord.js');
const { Discord, client, puppeteer, on, fs, http } = require('./files/core_module.js');
const { getDB } = require('./files/functions/getDB.js');
const { register } = require('./files/functions/register.js');
const { ping, dayOfYear, changePrefix, genshin, getID, initiateNewGuild, schedule, addUserDB, registerBinus } = require('./files/function_lists.js');
const { isNumber } = require('./files/functions/isNumber.js');

var database = {
    guildList: [],
    guildProperty: {
        prefix: [],
        guildMember: [],
    },
    userList: [],
    userProperty: {
        email: [],
        pass: [],
        univ: [],
        forum: [],
        forumCount: [],
    }
}

client.on('ready', async () => {
    client.user.setPresence({
        activity: {
            name: "!help to view more commands",
            type: "PLAYING",
        }
    });
    database = await getDB();
    console.log("I\'m ready!");
});

client.on('guildCreate', (guild) => {
    initiateNewGuild(guild);
});

client.on('message', (msg) => {
    let isGuild = (msg.guild) ? true : false;

    var globalPrefix = '!';

    if (isGuild){
        const guildIdx = database.guildList.indexOf(msg.guild.id);
        const prefix = database.guildProperty.prefix[guildIdx];

        if ((msg.content.startsWith(prefix) || msg.content.startsWith(globalPrefix)) && !msg.author.bot){
            let args = (msg.content.startsWith(prefix)) ? msg.content.slice(prefix.length).split(" ") : msg.content.slice(globalPrefix.length).split(" ");
            switch (args[0].toLowerCase()) {
                case 'ping':
                    ping(msg);
                    break;
                case 'id':
                    getID(msg);
                    break;
                case 'prefix':
                    if (!args[1]){
                        msg.channel.send(new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription("New prefix is not valid, please correctly input the prefix"));
                    } 
                    else {
                        changePrefix(database, guildIdx, msg, args[1]);
                    }
                    break;
                case 'schedule':
                    schedule(database, guildIdx, msg, args);
                    break;                    
                case 'help': 
                    let commands, description;
                    fs.readFile('command-list.txt', function read(err, data) {
                        if (err) throw err;
                        commands = data.toString().split('\r\n\r\n')[0].split(';\r\n');
                        description = data.toString().split('\r\n\r\n')[1].split(';\r\n');
                        var commandQty = commands.length;
    
                        embedHelp = new Discord.MessageEmbed()
                        .setColor('#FFFFFF')
                        .setTitle('List of Commands');
    
                        for (let i = 0; i < commandQty; i++){
                            embedHelp.addField(prefix + commands[i], '-' + description[i]);
                        }
                        msg.channel.send(embedHelp);
                    });
                    break;
                case 'register':
                    database = register(database, msg);
                    break;
                case 'genshin':
                    var day = (new Date()).getDay();
                    genshin(msg ,day);
                    break;
                default:
                    msg.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Wrong Command Input!"));

                    initiateNewGuild(msg.guild);

                    break;
            }
        }
        else {
            return;
        }
    }

    else{
        if (msg.author.bot) return;
    }

    

    
});

/*
    * References:
    * https://www.youtube.com/watch?v=I7eZY-SBmf8 (Embed Message)
    * https://youtu.be/nt9M-rlbWc8 (Export Import)
*/

// client.login(process.env.token);
client.login('ODIxMDUwOTkyMDk1MTMzNjk3.YE-FUg.d5xllxs3BY20K37YWzzBMhNAkHY');
