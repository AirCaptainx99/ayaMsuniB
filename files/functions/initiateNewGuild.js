const { Discord, http, Imagekit } = require("../core_module.js");

let folder = "/UserDiscordDB/";

var imagekit = new Imagekit({
    publicKey : "public_BY4rH/oQzUDkghcLA2LVPL0ex7g=",
    privateKey : "private_hsWNeK5l9+wuOS3uoXQ0rKeOcwg=",
    urlEndpoint : "https://ik.imagekit.io/adx3pkqj0s6"
});

let fileName = '';
const imageKitWrapper = (str) => {
    imagekit.upload({
        file: Buffer.from(str),
        fileName: fileName,
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

const initiateNewGuild = function(guild) {
    guild.members.cache
    .filter(x => x.user.bot)
    .each(x => {
        fileName = x.user.id + ".txt";
        let options = {
            host: "ik.imagekit.io",
            path: "/adx3pkqj0s6/UserDiscordDB/" + fileName + '?ie=' + (new Date()).getTime(),
        }
        let request = http.request(options, function (res) {
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function(){
                if (data === 'Not Found'){
                    imageKitWrapper(x.user.username);
                }
            })
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    });
    
    // fileName = "Babibu.txt";
    // imageKitWrapper("test");

//     for (let i = 0; i < members.length; i++){
        
//     }
};

module.exports = {
    initiateNewGuild,
}