const { firebase } = require("../config.js");
const { Discord } = require("discord.js");

const addUserDB = (userId, email, pass, univ) => {
    const refDB = firebase.database().ref("/user/" + userId);
    refDB.update({
        "email": email,
        "pass": pass,
        "univ": univ,
        "forumCount": 0,
    });
}

module.exports = {
    addUserDB,
}