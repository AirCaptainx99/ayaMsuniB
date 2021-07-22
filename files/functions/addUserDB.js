const { httpOptions, http, imagekitTemplate } = require("../core_module.js");

const addUserDB = (file, fileName) => {
    console.log(file + "\n" + fileName + "\n\n");
    return checkDB(file, fileName);
}

const checkDB = async (file, fileName) => {
    let options = httpOptions;
    options.path += "UserDiscordDB/" + fileName + "?ie=" + (new Date()).getTime();

    let request = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            if (data === "Not Found"){
                console.log(file + "\n" + fileName + "\n\n");
                return upload(file, fileName);
            }
        });
        return new Promise()
    });
    request.on('error', (err) => {
        console.log(err);
    });
    request.end();
}

const upload = async (file, fileName) => {
    let imagekit = imagekitTemplate;
    return imagekit.upload({
        file: Buffer.from(file),
        fileName: fileName,
        useUniqueFileName: false,
        folder: "/UserDiscordDB/",
    });
}

module.exports = {
    addUserDB,
}