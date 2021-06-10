const { updateDB } = require('./updateDB.js');

const addNewStudent = function(msg, database, email, pass, univ){
    var isInDB = false;
    for (var i = 0; i < database.length - 1; i++){
        if (msg.guild.id === database[i].split('\r\n<split>\r\n')[0]){
            var options = {
                host: "ik.imagekit.io",
                path: "/adx3pkqj0s6/" + database[i].split('\r\n<split>\r\n')[0] + '?ie=' + (new Date()).getTime(),
            }
            var request = http.request(options, function (res) {
                var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });

                data += email + "\r\n<data>\r\n" + pass + "\r\n<data>\r\n" + msg.author.id + "\r\n<data>\r\n" + univ + "\r\n<split>\r\n";

                res.on('end', function () {
                    // console.log(data);
                    updateDB(database, database[i].split('\r\n<split>\r\n')[0]);
                });
            });
            request.on('error', function (e) {
                console.log(e.message);
            });
            request.end();
        }
    }
}