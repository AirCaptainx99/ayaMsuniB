const { Discord } = require('../core_module.js');
const { isNumber } = require('../function_lists.js')

const scheduleBinus = (msg, args) => {
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
}

module.exports = {
    scheduleBinus,
}