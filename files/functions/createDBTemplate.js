const { updateDB } = require('./updateDB.js');

const createDBTemplate = function(msg, database, newPrefix, fileName){
    var appDB = "\r\n<split>\r\n" + msg.guild.id + "\r\n<data>\r\n" + newPrefix;
    database[database.length - 2] += appDB;
    console.log(database);

    // return updateDB(database, fileName);
}

module.exports = {
    createDBTemplate,
}