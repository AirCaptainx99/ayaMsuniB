const { MessageEmbed } = require('discord.js');
const { Discord, http } = require('../core_module.js');
const { scheduleBinus } = require('./scheduleBinus.js');

const schedule = async (database, guildIdx, msg, args) => {
    let isHelpSchedule = (!args[1]) ? true : false;
    let listOfStudents = [];
    let idx = 0;
    if (isHelpSchedule){
        database.guildProperty.guildMember[guildIdx].forEach((member) => {
            if (database.userList.includes(member)){
                listOfStudents[idx++] = "`[" + [idx] + "]`. " + "<@!" + member + ">";
            }
        });

        msg.channel.send(new MessageEmbed()
        .setColor("BLUE")
        .setTitle("List of Registered Student(s)")
        .setDescription(listOfStudents));
    }
    else{

    }
}

const fetchGuildDatabase = (msgProgress, isHelpSchedule, msg, target) => {
    let options = {
        host: "ik.imagekit.io",
        path: "/adx3pkqj0s6/GuildDiscordDB/" + msg.guild.id + ".txt" + "?ie=" + (new Date()).getTime(),
    }

    let request = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            prefix = data.split('\r\n<split>\r\n')[0];
            data = data.split('\r\n<split>\r\n')[1].split('.txt\r\n');
            fetchUserDatabase(msgProgress, isHelpSchedule, msg, prefix, target, data, [], 0);
        })
    });
    request.on('error', (err) => {
        console.log(err);
    });
    request.end();
}

const fetchUserDatabase = (msgProgress, isHelpSchedule, msg, prefix, target, rawData, processedData, index) => {
    if (index < rawData.length - 1){
        let options = {
            host: "ik.imagekit.io",
            path: "/adx3pkqj0s6/UserDiscordDB/" + rawData[index] + ".txt" + "?ie=" + (new Date()).getTime(),
        }

        let request = http.request(options, (res) => {
            console.log("masuk");
            let isUser = false;
            res.on('data', (chunk) => {
                if (chunk.toString().includes('<split>')){
                    isUser = true;
                }
            });
            res.on('end', () => {
                if (isUser){
                    processedData[processedData.length] = rawData[index];
                }
                fetchUserDatabase(msgProgress, isHelpSchedule, msg, prefix, target, rawData, processedData, index + 1);
            })
        });
        request.on('error', (err) => {
            console.log(err);
        });
        request.end();
    }
    else{
        if (isHelpSchedule){
            msgProgress.edit(new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Creating a list of registered students'));
            helpSchedule(msgProgress, prefix, processedData);
        }
        else{
            // cek schedule
        }
    }
}

const helpSchedule = (msgProgress, prefix, data) => {
    let words = '';

    for (let i = 0; i < data.length; i++){
        words += '[' + [i+1] + ']. ' + '<@!' + data[i] + '>\n'
    }

    words += '\nChoose with the index numbering! (type with ' + prefix + 'schedule [index_of_student])';

    msgProgress.edit(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('List of Student(s):')
    .setDescription(words));
}

module.exports = {
    schedule,
}