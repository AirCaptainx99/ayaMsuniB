const { MessageEmbed } = require('discord.js');
const { firebase } = require('../config.js');
const { Discord, client } = require ("../core_module.js");
const { addUserDB } = require('./addUserDB.js');

var userId, email, pass, univ;

function regisForm(msg) {
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
        registerBinus(msg);
        return;
    }

    if (verified){
        updateDB(msg, userId, email, pass, univ);
    }
}

function updateDB(msg, userId, email, pass, univ){
    client.off("message", regisForm);
    // addUserDB(userId, email, pass, univ);
    msg.channel.send(new Discord.MessageEmbed()
    .setTitle("Success")
    .setDescription("Your registration is successful")
    .setColor("GREEN"));
}

const registerBinus = (msg) => {
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