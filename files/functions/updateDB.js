const updateDB = function(database, fileName){
    const Imagekit = require('imagekit');
    const http = require('https');
    
    var imagekit = new Imagekit({
        publicKey : "public_BY4rH/oQzUDkghcLA2LVPL0ex7g=",
        privateKey : "private_hsWNeK5l9+wuOS3uoXQ0rKeOcwg=",
        urlEndpoint : "https://ik.imagekit.io/adx3pkqj0s6"
    });
    let fileUrl = "https://ik.imagekit.io/adx3pkqj0s6/" + fileName;
    
    // var imagekit = new Imagekit({
    //     publicKey : process.env.publicKey,
    //     privateKey : process.env.privateKey,
    //     urlEndpoint : process.env.urlEndpoint
    // });
    // let fileUrl = process.env.urlEndpoint + fileName;
    
    fileUrl += '?ie=' + (new Date()).getTime();
    
    const imageKitWrapper = (str) => {
        imagekit.upload({
            file: Buffer.from(str),
            fileName: fileName,
            useUniqueFileName: false
        }, (error, res) => {
            if(error) {
                console.log(error);
            } else {
                console.log(res);
            }
        });
    }

    // var options = {
    //     host: "ik.imagekit.io",
    //     path: "/adx3pkqj0s6/" + fileName + '?ie=' + (new Date()).getTime(),
    // }
    // var request = http.request(options, function (res) {
    //     var data = '';
    //     res.on('data', function (chunk) {
    //         data += chunk;
    //     });
    //     res.on('end', function () {
    //         console.log(data);

    //     });
    // });
    // request.on('error', function (e) {
    //     console.log(e.message);
    // });
    // request.end();

    var str = '';
    for (var i = 0; i < database.length - 1; i++){
        str += database[i] + '\r\n<split>\r\n';
    }

    imageKitWrapper(str);
    return str.split('\r\n<split>\r\n');
}

module.exports = {
    updateDB,
}