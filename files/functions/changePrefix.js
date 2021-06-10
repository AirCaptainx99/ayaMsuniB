const { updateDB } = require('./updateDB.js');
const { createDBTemplate } = require('./createDBTemplate.js');

const changePrefix = function(msg, database, newPrefix){
    var isInDB = false;
    var newDB = '';
    for (var i = 0; i < database.length - 1; i++){
        if (msg.guild.id === database[i].split("\r\n<data>\r\n")[0]){
            newDB = database[i].split("\r\n<data>\r\n");
            newDB[1] = newPrefix;
            database[i] = '';
            
            for (var j = 0; j < newDB.length; j++){
                database[i] += newDB[j];
                if (j === newDB.length - 1) break;
                database[i] += "\r\n<data>\r\n";
            }
            isInDB = true;
            console.log(database);
            break;
        }
    }

    return (isInDB) ? updateDB(database, "ayaMsuniBDB.txt") : createDBTemplate(msg, database, newPrefix, "ayaMsuniBDB.txt");
}

module.exports = {
    changePrefix,
}