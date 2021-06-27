const { MessageEmbed } = require('discord.js');
const { Discord } = require('../core_module.js');
const genshin = async function (msg, day){
    let message = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setTitle('Genshin Farmables');
    switch (day){
        case 1 :
            message.setDescription('**Monday**');
            message.addField('Mondstadt Talent: Freedom', 'Amber\nBarbara\nKlee\nSucrose\nChilde\nDiona');
            message.addField('Liyue Talent: Prosperity', 'Keqing\nNingguang\nQiqi\nXiao');
            break;
        case 2 :
            message.setDescription('**Tuesday**');
            message.addField('Mondstadt Talent: Resistance', 'Bennet\nDiluc\nJean\nMona\nNoelle\nRazor\nEula');
            message.addField('Liyue Talent: Diligence', 'Chongyun\nXiangling\nGanyu\nHu Tao');
            break;
        case 3 :
            message.setDescription('**Wednesday**');
            message.addField('Mondstadt Talent: Ballad', 'Fischl\nKaeya\nLisa\nVenti\nAlbedo\nRosaria');
            message.addField('Liyue Talent: Gold', 'Beidou\nXingqiu\nZhongli\nXinyan\nYanfei');
            break;
        case 4 :
            message.setDescription('**Thursday**');
            message.addField('Mondstadt Talent: Freedom', 'Amber\nBarbara\nKlee\nSucrose\nChilde\nDiona');
            message.addField('Liyue Talent: Prosperity', 'Keqing\nNingguang\nQiqi\nXiao');
            break;
        case 5 :
            message.setDescription('**Friday**');
            message.addField('Mondstadt Talent: Resistance', 'Bennet\nDiluc\nJean\nMona\nNoelle\nRazor\nEula');
            message.addField('Liyue Talent: Diligence', 'Chongyun\nXiangling\nGanyu\nHu Tao');
            break;
        case 6 :
            message.setDescription('**Saturday**');
            message.addField('Mondstadt Talent: Ballad', 'Fischl\nKaeya\nLisa\nVenti\nAlbedo\nRosaria');
            message.addField('Liyue Talent: Gold', 'Beidou\nXingqiu\nZhongli\nXinyan\nYanfei');
            break;
        case 0 :
            message.setDescription('**Kebuka Semua Goblock**');
            break;
    }
    msg.channel.send(message);
}

module.exports = {
    genshin,
}