const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const { on } = require('events');

module.exports = {
    Discord,
    client,
    puppeteer,
    on,
}