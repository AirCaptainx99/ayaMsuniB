// using recurssion cause I'm FUCKING SUCK AT ASYNC AND AWAIT

const { Discord, http, Imagekit } = require("../core_module.js");

let folder = "/UserDiscordDB/";

var imagekit = new Imagekit({
    publicKey : "public_BY4rH/oQzUDkghcLA2LVPL0ex7g=",
    privateKey : "private_hsWNeK5l9+wuOS3uoXQ0rKeOcwg=",
    urlEndpoint : "https://ik.imagekit.io/adx3pkqj0s6"
});

const initiateNewGuild = function(guild) {
    const memberName = guild.members.cache.filter(x => !x.user.bot).map(x => x.user.username);
    const fileName = guild.members.cache.filter(x => !x.user.bot).map(x => x.user.id);

    const createGuildDB = () => {
        let option = {
            host: "ik.imagekit.io",
            path: "/adx3pkqj0s6/GuildDiscordDB/" + guild.id + ".txt" + "?ie=" + (new Date()).getTime(),
        }

        let request = http.request(option, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (data === "Not Found"){
                    folder = "/GuildDiscordDB/";
                    buffer = "!\r\n<split>\r\n";
                    for (let i = 0; i < fileName.length; i++){
                        buffer += fileName[i] + ".txt\r\n";
                    }

                    imagekit.upload({
                        file: Buffer.from(buffer),
                        fileName: guild.id + ".txt",
                        useUniqueFileName: false,
                        folder: folder,
                    }, (error, res) => {
                        if(error) {
                            console.log(error);
                        } else {
                            console.log(res);
                        }
                    });
                }
            })
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    }

    const imageKitWrapper = (i) => {
        let options = {
            host: "ik.imagekit.io",
            path: "/adx3pkqj0s6/UserDiscordDB/" + fileName[i] + '.txt' + '?ie=' + (new Date()).getTime(),
        }
        let request = http.request(options, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function(){
                if (data === 'Not Found'){
                    console.log(memberName[i]);
                    imagekit.upload({
                        file: Buffer.from(memberName[i]),
                        fileName: fileName[i] + '.txt',
                        useUniqueFileName: false,
                        folder: folder,
                    }, (error, res) => {
                        if(error) {
                            console.log(error);
                        } else {
                            console.log(res);
                            if (fileName[i+1]){
                                imageKitWrapper(i+1);
                            }
                        }
                    });
                }
                else if (fileName[i+1]){
                    imageKitWrapper(i+1);
                }
                else{
                    createGuildDB();
                }
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    }

    if (memberName.length >= 1){
        imageKitWrapper(0);
    }
};

module.exports = {
    initiateNewGuild,
}