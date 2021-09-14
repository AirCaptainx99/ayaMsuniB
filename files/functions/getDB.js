const { firebase } = require("../config.js");

let database = {
    guildList: [],
    guildProperty: {
        prefix: [],
        guildMember: [],
    },
    userList: [],
    userProperty: {
        email: [],
        pass: [],
        univ: [],
        forum: [],
        forumCount: [],
    }
}

const getDB = async () => {
    const rootDB = firebase.database().ref();
    let idx = 0;
    rootDB.once("value", (root) => {
        root.child("guild").forEach((guild) => {
            database.guildList[idx] = guild.key;
            database.guildProperty.prefix[idx] = guild.child("prefix").val();
            let guildMember = [];
            let i = 0;
            guild.child("members").forEach((member) => {
                guildMember[i++] = member.val();
            })
            database.guildProperty.guildMember[idx] = guildMember;
            idx++;
        });

        idx = 0;
        root.child("user").forEach((user) => {
            database.userList[idx] = user.key;
            database.userProperty.email[idx] = user.child("email").val();
            database.userProperty.pass[idx] = user.child("pass").val();
            database.userProperty.univ[idx] = user.child("univ").val();
            database.userProperty.forumCount[idx] = user.child("forumCount").val();
            if (database.userProperty.forumCount[idx] > 0){
                let i = 0;
                let forumList = [];
                user.child("forum").forEach((forum) => {
                    forumList[i] = forum.val();
                });
                database.userProperty.forum[idx] = forumList;
            }
            idx++;
        });
    });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    }).then(() => {
        return database;
    });
}

module.exports = {
    getDB,
}