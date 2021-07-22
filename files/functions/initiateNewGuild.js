const { Discord, http, imagekit, httpOptions, imagekitTemplate } = require("../core_module.js");
const { addUserDB } = require("./addUserDB.js");

const createGuildDB = async (guild) => {
    const memberName = guild.members.cache.filter(x => !x.user.bot).map(x => x.user.username);
    const memberId = guild.members.cache.filter(x => !x.user.bot).map(x => x.user.id);

    let options = httpOptions;
    options.path += "GuildDiscordDB/" + guild.id + ".txt" + "?ie=" + (new Date()).getTime();

    let request = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', async () => {
            for (let i = 0; i < memberId.length; i++){
                await addUserDB(memberName[i], memberId[i] + ".txt");
            }
            if (data === "Not Found"){
                return upload(guild, memberId);
            }
        });
    });
    request.on('error', (err) => {
        console.log(err);
    });
    request.end();
}

const upload = async (guild, memberId) => {
    buffer = "!\r\n<split>\r\n";
    for (let i = 0; i < memberId.length; i++){
        buffer += memberId[i] + ".txt\r\n";
    }
    let imagekit = imagekitTemplate;
    return imagekit.upload({
        file: Buffer.from(buffer),
        fileName: guild.id + ".txt",
        useUniqueFileName: false,
        folder: "/GuildDiscordDB/",
    });
}

const initiateNewGuild = (guild) => {
    return createGuildDB(guild);
};

module.exports = {
    initiateNewGuild,
}