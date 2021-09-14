const { MessageEmbed, TextChannel, Guild, Emoji, GuildEmoji } = require('discord.js');
const { Discord, client, puppeteer, on, fs, http } = require('./files/core_module.js');
const { getDB } = require('./files/functions/getDB.js');
const { register } = require('./files/functions/register.js');
const { ping, isNumber, dayOfYear, changePrefix, genshin, getID, initiateNewGuild, schedule, addUserDB, registerBinus } = require('./files/function_lists.js');

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
                    if (!args[1]){
                        schedule(database, guildIdx, msg, args);
                        return;
                    }
                    
                    else{
                        let selectEmail, selectPass, selectID, dayAmount;
                        if (isNumber(args[1])){
                            if (args[1] > user.length || args[1] <= 0) {
                                msg.channel.send('Index not valid!');
                                return;
                            }
                            selectEmail = email[args[1] - 1];
                            selectPass = pass[args[1] - 1];
                            selectID = userID[args[1] - 1];
                        }
    
                        else if (!isNumber(args[1])){
                            let key = args[1].toLowerCase();
                            for (let i = 0; i < email.length; i++){
                                if (user[i].toLowerCase().includes(key)){
                                    selectEmail = email[i];
                                    selectPass = pass[i];
                                    selectID = userID[i];
                                    break;
                                }
                            }
                        }
    
                        if (args[2]){
                            if (!(args[2].toLowerCase() === 'max') && !isNumber(args[2])){
                                let err = new Discord.MessageEmbed()
                                .setColor('#FFFFFF')
                                .setTitle('Second Argument is not valid!');
                                msg.channel.send(err);
                                return;
                            }
                        }
                        
                        (async () => {
                            let progressInfo = new Discord.MessageEmbed()
                            .setTitle('Acquiring data from the website');
                            let progressMsg = await msg.channel.send(progressInfo);
    
                            const browser = await puppeteer.launch({
                                'args': [
                                    '--no-sandbox',
                                    '--disable-setuid-sandbox',
                                ],
                            });
                            const page = await browser.newPage();
    
                            await Promise.all([
                                await page.goto('https://myclass.apps.binus.ac.id/Auth'),
                                await page.click('.user-input'),
                                await page.keyboard.type(selectEmail),
                                await page.click('.custom-textbox'),
                                await page.keyboard.type(selectPass),
                                await page.click('#btnSubmit'),
                                await page.waitForNavigation({waitUntil: 'networkidle0'})
                            ]);
    
                            const result = await page.evaluate(() => {
                                let serverTime = document.querySelectorAll('.serverTime');
                                let date = document.querySelectorAll('.iDate');
                                let time = document.querySelectorAll('.iTime');
                                let classCode = document.querySelectorAll('.iClass');
                                let room = document.querySelectorAll('.iRoom');
                                let campus = document.querySelectorAll('.iCampus');
                                let deliveryMode = document.querySelectorAll('.iDeliveryMode');
                                let course = document.querySelectorAll('.iCourse');
                                let week = document.querySelectorAll('.iWeek');
                                let session = document.querySelectorAll('.iSession');
                                let meetingID = document.querySelectorAll('.iMeetingID');
                                let meetingPassword = document.querySelectorAll('.iMeetingPassword');
                                let vicon = document.querySelectorAll('.iAction');
    
                                return{
                                    serverTime: [...serverTime].map(h => h.innerText),
                                    date: [...date].map(h => h.innerText),
                                    time: [...time].map(h => h.innerText),
                                    classCode: [...classCode].map(h => h.innerText),
                                    room: [...room].map(h => h.innerText),
                                    campus: [...campus].map(h => h.innerText),
                                    mode: [...deliveryMode].map(h => h.innerText),
                                    course: [...course].map(h => h.innerText),
                                    week: [...week].map(h => h.innerText),
                                    session: [...session].map(h => h.innerText),
                                    meetID: [...meetingID].map(h => h.innerText),
                                    meetPass: [...meetingPassword].map(h => h.innerText),
                                    vicon: [...vicon].map(h => h.innerHTML)
                                };
                            });
    
                            if (result.date.length == 2){
                                progressInfo = new Discord.MessageEmbed()
                                .setColor('#FFFFFF')
                                .setTitle('Schedule List')
                                .setDescription('Owner: [<@!' + selectID + '>]' + '\n\n' + '**No upcoming class in the near future!**');
    
                                progressMsg.edit(progressInfo);
                            }
                            else{ 
                                progressInfo = new Discord.MessageEmbed()
                                .setTitle('Creating List of Schedule');
                                progressMsg.edit(progressInfo);
            
                                let otherIdx = 2, idx = 0;
                                let scheduleListData = [];
                                for (let i = 0; i < result.date.length - 2; i++){
                                    scheduleListData[i] = '';
                                }
                                scheduleListData[idx] = result.date[otherIdx];
                                let serverTime = result.serverTime.toString().toLowerCase().split(' ');
                                serverTime = serverTime[1] + ' ' + serverTime[2] + ' ' + serverTime[3];
            
                                progressInfo = new Discord.MessageEmbed()
                                .setColor('#FFFFFF')
                                .setTitle('Schedule List')
                                .setDescription('Owner: [<@!' + selectID + '>]');
            
                                (!args[2]) ? dayAmount = 0 : dayAmount = args[2];
            
                                let endPoint = dayOfYear(serverTime) + parseInt(dayAmount);
                                if (args[2]){
                                    if (args[2].toLowerCase() === 'max') endPoint = dayOfYear(result.date[result.date.length - 1]);
                                    else if (endPoint > dayOfYear(result.date[result.date.length - 1])) endPoint = dayOfYear(result.date[result.date.length - 1]);
                                }
                                while (result.date[otherIdx] && dayOfYear(result.date[otherIdx]) <= endPoint) {
                                if (scheduleListData[idx] == result.date[otherIdx]){
                                        if (!scheduleListData[idx+1]){
                                            scheduleListData[idx+1] = '';
                                        }
                                        if (!scheduleListData[idx+1].includes(result.time[otherIdx])){
                                            scheduleListData[idx+1] += '`' + result.time[otherIdx] + '`';
                                            if (result.mode[otherIdx] == 'GSLC' || result.vicon[otherIdx] === '-'){
                                                scheduleListData[idx+1] += ' `' + result.classCode[otherIdx] + '`' + result.course[otherIdx].split('-')[1] + '\n';
                                            }
                                            else if (result.mode[otherIdx] == 'VC'){
                                                scheduleListData[idx+1] += ' `' + result.classCode[otherIdx] + '`' + '[' + result.course[otherIdx].split('-')[1] + '](' + result.vicon[otherIdx].split('\"')[1] + ')' + '\n';
                                            }
                                        }
                                    }
                                    else{
                                        progressInfo.addField(scheduleListData[idx], scheduleListData[idx+1]);
                                        idx += 2;
                                        scheduleListData[idx] = result.date[otherIdx];
                                        scheduleListData[idx+1] += '`' + result.time[otherIdx] + '`';
                                        if (result.mode[otherIdx] == 'GSLC' || result.vicon[otherIdx] === '-'){
                                            scheduleListData[idx+1] += ' `' + result.classCode[otherIdx] + '`' + result.course[otherIdx].split('-')[1] + '\n';
                                        }
                                        else if (result.mode[otherIdx] == 'VC'){
                                            scheduleListData[idx+1] += ' `' + result.classCode[otherIdx] + '`' + '[' + result.course[otherIdx].split('-')[1] + '](' + result.vicon[otherIdx].split('\"')[1] + ')' + '\n';
                                        }
                                    }
                                    otherIdx++;
                                }
                                progressInfo.addField(scheduleListData[idx], scheduleListData[idx+1]);
                                progressMsg.edit(progressInfo);
                            }
                            await browser.close();
                        })();
                    }
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
                    register(msg);
                    break;
                case 'genshin':
                    var day = (new Date()).getDay();
                    genshin(msg ,day);
                    break;
                default:
                    msg.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Wrong Command Input!"));

                    register(database, msg);

                    break;
            }
        }
        else {
            return;
        }
    }

    else{
        if (msg.author.bot) return;

        register(database, msg);
    }

    

    
});

/*
    * References:
    * https://www.youtube.com/watch?v=I7eZY-SBmf8 (Embed Message)
    * https://youtu.be/nt9M-rlbWc8 (Export Import)
*/

// client.login(process.env.token);
client.login('ODIxMDUwOTkyMDk1MTMzNjk3.YE-FUg.d5xllxs3BY20K37YWzzBMhNAkHY');
