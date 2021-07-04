const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const { on } = require('events');
const fs = require('fs');
const http = require('https');
const Imagekit = require('imagekit');

module.exports = {
    Discord,
    client,
    puppeteer,
    on,
    fs,
    http,
    Imagekit,
}