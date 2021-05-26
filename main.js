const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const fs = require('fs');
const { on } = require('events');

var prefix = "!";

String.prototype.isNumber = function() {
    return /^\d+$/.test(this);
}

String.prototype.isLunarYear = function() {
    if ((this % 4 == 0 && this % 100 != 0) || this % 400 == 0) return true;
    else return false;
}

String.prototype.dayOfYear = function() {
    if (!this) return Infinity;
    let date = this.toLowerCase().trim().split(' ');
    let num = parseInt(date[0]);
    if (date[1] === 'jan' || date[1] === 'january') num += 0;
    else if (date[1] === 'feb' || date[1] === 'february') num += 31;
    else if (date[1] === 'mar' || date[1] === 'march') (date[2].isLunarYear()) ? num += 60 : num += 59;
    else if (date[1] === 'apr' || date[1] === 'april') (date[2].isLunarYear()) ? num += 91 : num += 90;
    else if (date[1] === 'may') (date[2].isLunarYear()) ? num += 121 : num += 120;
    else if (date[1] === 'jun' || date[1] === 'june') (date[2].isLunarYear()) ? num += 152 : num += 151;
    else if (date[1] === 'jul' || date[1] === 'july') (date[2].isLunarYear()) ? num += 182 : num += 181;
    else if (date[1] === 'aug' || date[1] === 'august') (date[2].isLunarYear()) ? num += 213 : num += 212;
    else if (date[1] === 'sep' || date[1] === 'september') (date[2].isLunarYear()) ? num += 244 : num += 243;
    else if (date[1] === 'okt' || date[1] === 'oktober') (date[2].isLunarYear()) ? num += 274 : num += 273;
    else if (date[1] === 'nov' || date[1] === 'november') (date[2].isLunarYear()) ? num += 305 : num += 304;
    else if (date[1] === 'dec' || date[1] === 'december') (date[2].isLunarYear()) ? num += 335 : num += 334;
    return num;
}

var email = ['jeffryco.ardiya', 'willie.soo'];
var pass = ['b!Nu$21042002', 'b!Nu$01082002'];
var userID = ['323460378895843330', '323637366474539009'];
var user = ['AirCaptainx99#9961', 'Niax'];

client.on('ready', () => {
    console.log('I\'m ready!');
});

client.on('message', (msg) => {

    /*
    setInterval(() => {
    let date = new Date(); // today
        if (0 <= date.getHours() && date.getHours() <= 12 && date.getHours() % 2 === 0 && date.getMinutes() === 0) {
            msg.channel.send('Coba cek jadwal cuy!');
            
        }
    }, 60000); // check every minute
    */
    
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.slice(prefix.length).split(" ");
    let words = "";
    switch (args[0].toLowerCase()) {
        case 'wtfwrite':
            fs.appendFile('user.txt', 'Hello content!', function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            break;
        case 'wtfread':
            fs.readFile('user.txt', async function read (err, data) {
                if (err) throw err;
                msg.channel.send(data.toString());
            })
        case 'ping':
            let date = new Date();
            msg.channel.send('Pong!' + ' ' + date.getHours() + ' ' + date.getMinutes() + ' ' + date.getSeconds());
            break;
        case 'id':
            msg.channel.send(msg.author.id);
            break;
        case 'prefix':
            if (!args[1]) msg.channel.send('Command is not valid, please correctly input the command');
            else {
                prefix = args[1];
                msg.channel.send('The prefix has been changed into ' + prefix);
            }
            break;
        case 'schedule':
            if (!args[1]){
                words = '```\nList of Student(s):\n\n';
                for (let i = 0; i < user.length; i++){
                    words += '[' + (i+1) + ']. ' + user[i] + '\n';
                }
                words += '\nChoose with the index numbering! (type with ' + prefix + 'schedule [index_of_student])\n```';
                msg.channel.send(words);
                return;
            }
            
            else{
                let selectEmail, selectPass, selectID, dayAmount;
                if (args[1].isNumber()){
                    if (args[1] > user.length || args[1] <= 0) {
                        msg.channel.send('Index not valid!');
                        return;
                    }
                    selectEmail = email[args[1] - 1];
                    selectPass = pass[args[1] - 1];
                    selectID = userID[args[1] - 1];
                }

                else if (!args[1].isNumber()){
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
                    if (!(args[2].toLowerCase() === 'max') && !args[2].isNumber()){
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

                    let endPoint = serverTime.dayOfYear() + parseInt(dayAmount);
                    if (args[2]){
                        if (args[2].toLowerCase() === 'max') endPoint = result.date[result.date.length - 1].dayOfYear();
                        else if (endPoint > result.date[result.date.length - 1].dayOfYear()) endPoint = result.date[result.date.length - 1].dayOfYear();
                    }

                    while (result.date[otherIdx] && result.date[otherIdx].dayOfYear() <= endPoint) {
                        if (scheduleListData[idx] == result.date[otherIdx]){
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
                    await browser.close();
                })();
            }
            break;
        case 'help': 
            let commands, description;
            fs.readFile('command-list.txt', async function read(err, data) {
                if (err) throw err;

                if (data.toString().includes('\r\n\r\n')){
                    commands = data.toString().split('\r\n\r\n')[0].split(';\r\n');
                    description = data.toString().split('\r\n\r\n')[1].split(';\r\n');
                }
                else{
                    commands = data.toString().split('\n\n')[0].split(';\n');
                    description = data.toString().split('\n\n')[1].split(';\n');
                }
                var commandQty = commands.length;

                for (let i = 0; i < commandQty; i++){
                    words += '\n\n' + prefix + commands[i] + '\n';
                    words += '- ' + description[i];
                }
                embedHelp = new Discord.MessageEmbed()
                .setColor('#FFFFFF')
                .setTitle('List of Commands')
                .setDescription(words);
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
        default:
            msg.channel.send('Wrong command input');
            break;
    }
});

/*
    * References:
    * https://www.youtube.com/watch?v=I7eZY-SBmf8 (Embed Message)
*/

client.login(process.env.token);
// client.login('ODIxMDUwOTkyMDk1MTMzNjk3.YE-FUg.d5xllxs3BY20K37YWzzBMhNAkHY')
