const { MessageEmbed } = require('discord.js');
const { firebase } = require('../config.js');
const { Discord, client } = require ("../core_module.js");
const { addUserDB } = require('./addUserDB.js');

var userId, email, pass, univ;

function regisForm(database, msg) {
    if (msg.author.bot){
        return;
    }

    let form = new Discord.MessageEmbed()
    .setTitle("Registration Form")
    .setDescription(
    "Use this format below to register.\n" + 
    "email = [your email] (don't use **@binus.ac.id** domain)\n" + 
    "pass = [your pass]\n" + 
    "\n" +
    "**Example:**\n" + 
    "email = my.email\n" + 
    "pass = pass123")
    .setColor("BLUE");

    let verified = true;
    try {
        if (msg.content.startsWith("email = ")){
            if (msg.content.split("\n")[1].includes("pass = ")){
                if (!msg.content.split("\n")[0].includes("@binus.ac.id")){
                    let data = msg.content.split("\n")
                    email = data[0].slice("email = ".length);
                    pass = data[1].slice("pass = ".length);
                    userId = msg.author.id;
                    univ = "binus";
    
                    msg.channel.send(new Discord.MessageEmbed()
                    .setTitle("Data Confirmation")
                    .setDescription(
                        "Is the data below correct? (Y/N) [Case Insensitive]" + 
                        "\nemail = " + email + 
                        "\npass = " + pass +
                        "\nuniversity = " + univ)
                    .setColor("YELLOW"));
    
                    client.on("message", verifyForm);
                }
                else{
                    verified = false;
                }
            }  
            else{
                verified = false;
            }
        }
        else{
            verified = false;
        }
    } catch (error) {
        verified = false;
    }
    

    if (!verified){
        client.off("message", regisForm);
        registerBinus(msg);
    }

    // if (!msg.author.bot){
    //     if (msg.content.includes("exit")){
    //         updateDB(msg, userId, email, pass, univ);
    //         msg.channel.send("Registration Canceled");
    //     }
    //     else{
    //         msg.channel.send(form);
    //     }
    // }
}

function verifyForm(msg){
    let verified = false;
    client.off("message", regisForm);

    if (msg.author.bot) return;

    if (msg.content.toLowerCase().includes("y")){
        verified = true;
    }
    else if (msg.content.toLowerCase().includes("n")){
        client.off("message", verifyForm);
        return registerBinus(msg);
        
    }

    if (verified){
        return updateDB(msg, userId, email, pass, univ);
    }
}

async function updateDB (msg, userId, email, pass, univ){
    client.off("message", regisForm);
    await addUserDB(userId, email, pass, univ);
    let newStudentIdx;

    for (let i = 0; i < database.userList.length; i++){
        if (userId < database.userList[i]){
            newStudentIdx = i;
            database.userList.splice(newStudentIdx, 0, userId);
            database.userProperty.email.splice(newStudentIdx, 0, email);
            database.userProperty.pass.splice(newStudentIdx, 0, pass);
            database.userProperty.univ.splice(newStudentIdx, 0, univ);
            database.userProperty.forumCount.splice(newStudentIdx, 0, 0);
            break;
        }
    }
    msg.channel.send(new Discord.MessageEmbed()
    .setTitle("Success")
    .setDescription("Your registration is successful")
    .setColor("GREEN"));
    return database;
}

const registerBinus = (database, msg) => {
    msg.channel.send(new Discord.MessageEmbed()
    .setTitle("Registration Form")
    .setDescription(
    "Use this format below to register.\n" + 
    "email = [your email] (**don't use @binus.ac.id domain**)\n" + 
    "pass = [your pass]\n" + 
    "\n" +
    "**Example:**\n" + 
    "email = my.email\n" + 
    "pass = pass123")
    .setColor("BLUE"));

    client.on("message", regisForm);
}

module.exports = {
    registerBinus,
}