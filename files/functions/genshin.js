const { MessageEmbed } = require('discord.js');
const { Discord } = require('../core_module.js');

const freedom = ["Amber", "Barbara", "Klee", "Sucrose", "Childe", "Diona"];
const prosperity = ["Keqing", "Ningguang", "Qiqi", "Xiao"];
const resistance = ["Bennet", "Diluc", "Jean", "Mona", "Noelle", "Razor", "Eula"];
const diligence = ["Chongyun", "Xiangling", "Ganyu", "Hu Tao", "Kazuha"];
const ballad = ["Fischl", "Kaeya", "Lisa", "Venti", "Albedo", "Rosaria"];
const gold = ["Beidou", "Xingqiu", "Zhongli", "Xinyan", "Yanfei"];

const genshin = async function (msg, day){
    let books = ['', ''];
    let mondstadt = '';
    let liyue = '';

    let message = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle('Genshin Farmables');
    switch (day){
        case 1 :
            message.setDescription('**Monday**');
            books[0] = 'Freedom';
            books[1] = 'Prosperity';
            for (let i = 0; i < freedom.length; i++){ // mondstadt
                mondstadt += freedom[i];
                if (i != freedom.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < prosperity.length; i++){ // liyue
                liyue = prosperity[i];
                if (i != prosperity.length - 1) liyue += '\n';
            }
            break;
        case 2 :
            message.setDescription('**Tuesday**');
            books[0] = 'Resistance';
            books[1] = 'Diligence';
            for (let i = 0; i < resistance.length; i++){ // mondstadt
                mondstadt += resistance[i];
                if (i != resistance.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < diligence.length; i++){ // liyue
                liyue += diligence[i];
                if (i != diligence.length - 1) liyue += '\n';
            }
            break;
        case 3 :
            message.setDescription('**Wednesday**');
            books[0] = 'Ballad';
            books[1] = 'Gold';
            for (let i = 0; i < ballad.length; i++){ // mondstadt
                mondstadt += ballad[i];
                if (i != ballad.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < gold.length; i++){ // liyue
                liyue += gold[i];
                if (i != gold.length - 1) liyue += '\n';
            }
            break;
        case 4 :
            message.setDescription('**Thursday**');
            books[0] = 'Freedom';
            books[1] = 'Prosperity';
            for (let i = 0; i < freedom.length; i++){ // mondstadt
                mondstadt += freedom[i];
                if (i != freedom.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < prosperity.length; i++){ // liyue
                liyue = prosperity[i];
                if (i != prosperity.length - 1) liyue += '\n';
            }
            break;
        case 5 :
            message.setDescription('**Friday**');
            books[0] = 'Resistance';
            books[1] = 'Diligence';
            for (let i = 0; i < resistance.length; i++){ // mondstadt
                mondstadt += resistance[i];
                if (i != resistance.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < diligence.length; i++){ // liyue
                liyue += diligence[i];
                if (i != diligence.length - 1) liyue += '\n';
            }
            break;
        case 6 :
            message.setDescription('**Saturday**');
            books[0] = 'Ballad';
            books[1] = 'Gold';
            for (let i = 0; i < ballad.length; i++){ // mondstadt
                mondstadt += ballad[i];
                if (i != ballad.length - 1) mondstadt += '\n';
            }
            for (let i = 0; i < gold.length; i++){ // liyue
                liyue += gold[i];
                if (i != gold.length - 1) liyue += '\n';
            }
            break;
        case 0 :
            message.setDescription('**Kebuka Semua Goblock**');
            break;
    }
    message.addField('Mondstadt Talent: ' + books[0], mondstadt);
    message.addField('Liyue Talent: ' + books[1], liyue);
    msg.channel.send(message);
}

module.exports = {
    genshin,
}