const { MessageEmbed, TextChannel, Guild, Emoji, GuildEmoji } = require('discord.js');
const { Discord, client, puppeteer, on, fs, http } = require('./files/core_module.js');
const { ping, isNumber, dayOfYear, changePrefix, genshin, getID, initiateNewGuild } = require('./files/function_lists.js');

var email = ['jeffryco.ardiya', 'willie.soo', 'albert.lucky'];
var pass = ['b!Nu$21042002', 'b!Nu$01082002', 'Eap180218'];
var userID = ['323460378895843330', '323637366474539009', '314580482534670338'];
var user = ['AirCaptainx99#9961', 'Niax#6355', 'AhokJr#9476'];

var database = '';

client.on('ready', () => {
    console.log("I\'m ready!");
});

client.on('guildCreate', (guild) => {
    initiateNewGuild(guild);
})

client.on('message', (msg) => {

    var globalPrefix = '!';
    var prefix = '';
    var isGuild = msg.guild.id;

    let options = {
        host: "ik.imagekit.io",
        path: "/adx3pkqj0s6/GuildDiscordDB/" + msg.guild.id + ".txt" + "?ie=" + (new Date()).getTime(),
    }

    let request = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function(){
            prefix = data.split("\r\n<split>\r\n")[0];

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
                            changePrefix(msg, args[1]);
                        }
                        break;
                    case 'schedule':
                        if (!args[1]){
                            // let studentList = new Discord.MessageEmbed()
                            // .setTitle('List of Student(s):');
        
                            let description = '';
                            
                            studentList.setTitle('List of Student(s):')
                            words = '```\nList of Student(s):\n\n';
                            for (let i = 0; i < user.length; i++){
                                words += '[' + (i+1) + ']. ' + user[i] + '\n';
                            }
                            words += '\nChoose with the index numbering! (type with ' + (prefix) ? prefix :  + ' schedule [index_of_student])\n```';
                            msg.channel.send(words);
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
                        function saveEmailPass(){
                            let newEmail, newPass;
                            newEmail = arguments[0];
                            newPass = arguments[1];
                        }
        
                        async function getEmailPass(){
                            let filter = m => emailContent;
                            let regisForm = new Discord.MessageEmbed()
                            .setColor('#FFFFFF')
                            .setTitle('Register Email')
                            .setDescription('Type in your binusmaya email (without the @binus.ac.id)');

                            client.users.cache.get(msg.author.id).send(regisForm).then(() => {
                                client.once('message', (emailRegis) => {
                                    if (!emailRegis.author.bot && !emailRegis.guild){
                                        console.log('ini pertama: ' + emailRegis.content);

                                        regisForm
                                        .setTitle('Register Password')
                                        .setDescription('Type in your binusmaya password');
                                
                                        client.users.cache.get(msg.author.id).send(regisForm).then(() => {
                                            client.once('message', (passRegis) => {
                                                if (!passRegis.author.bot && !passRegis.guild){
                                                    console.log('ini kedua: ' + passRegis.content);
                                                    
                                                    let data1 = '\`' + emailRegis.content + '@binus.ac.id\`\n';
                                                    let data2 = '\`' + passRegis.content + '\`';
        
                                                    regisForm
                                                    .setTitle('Confirm Registration')
                                                    .setDescription('Is the data below correct?\n\n' + 'Email: ' + data1 + 'Password: ' + data2)
                                                    .setFooter('Y/N (Case Insensitive)');
        
                                                    client.users.cache.get(passRegis.author.id).send(regisForm).then(() => {
                                                        let confirm = msg => {
                                                            if (!passRegis.author.bot && !passRegis.guild){
                                                                switch (msg.content.toLowerCase()){
                                                                    case 'y':
                                                                        console.log('yes');
                                                                        client.removeListener('message', confirm);
                                                                        break;
                                                                    case 'n':
                                                                        console.log('no');
                                                                        client.removeListener('message', confirm);
                                                                        getEmailPass();
                                                                        break;
                                                                    default:
                                                                        if (!msg.author.bot){
                                                                            client.users.cache.get(passRegis.author.id).send('Not valid input!');
                                                                        }
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                        client.on('message', confirm);
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                            })
                        }
        
                        getEmailPass();
                        break;
                    case 'read':
                        var link = args[1].split('/');
                        var head = link[2];
                        var tail = '';
        
                        for (let i = 3; i < link.length; i++){
                            tail += '/';
                            tail += link[i];
                        }
                        console.log(head);
                        console.log(tail);
        
                        let options = {
                            host: head,
                            path: tail,
                        }
                        let request = http.request(options, function (res) {
                            var data = '';
                            res.on('data', function (chunk) {
                                data += chunk;
                            });
                            res.on('end', function () {
                                console.log(data);
        
                            });
                        });
                        request.on('error', function (e) {
                            console.log(e.message);
                        });
                        request.end();

                        break;
                    case 'genshin':
                        var day = (new Date()).getDay();
                        genshin(msg ,day);

                        break;
                    default:
                        msg.channel.send(new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription("Wrong Command Input!"));

                        // let filter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === msg.author.id;
                        // msg.react('1️⃣').then(() => {
                        //     msg.awaitReactions(filter, {max: 1}).then(collected => console.log("collected " + collected.size + " reactions"));
                        // })


                        msg.channel.send(new Discord.MessageEmbed().setTitle('b'))
                        .then((message) => {
                            message.react('\u0031\u20E3');
                            message.react('\u0032\u20E3');
                            message.react('\u0033\u20E3')
                            .then(() => {
                                let filter = (reaction, user) => (reaction.emoji.name === '\u0031\u20E3' || reaction.emoji.name === '\u0032\u20E3' || reaction.emoji.name === '\u0033\u20E3') && user.id === msg.author.id;
                                message.awaitReactions(filter, {max: 1})
                                .then((collected) => {
                                    console.log(collected.first().emoji.name);
                                });
                            })
                        });

                        // msg.channel.send(new Discord.MessageEmbed().setTitle('a'))
                        // .then((message) => {
                        //     message.react('\u0031\u20E3').then(() => {message.react('\u0032\u20E3');}).then(() => {message.react('\u0033\u20E3')});
                        // });

                        

                        break;
                }
            }
            else {
                return;
            }
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
});

/*
    * References:
    * https://www.youtube.com/watch?v=I7eZY-SBmf8 (Embed Message)
    * https://youtu.be/nt9M-rlbWc8 (Export Import)
*/

// client.login(process.env.token);
client.login('ODIxMDUwOTkyMDk1MTMzNjk3.YE-FUg.d5xllxs3BY20K37YWzzBMhNAkHY');
