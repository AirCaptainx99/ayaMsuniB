const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const { on } = require('events');
const fs = require('fs');
const http = require('https');
const Imagekit = require('imagekit');
var imagekitTemplate = new Imagekit({
    publicKey : "public_BY4rH/oQzUDkghcLA2LVPL0ex7g=",
    privateKey : "private_hsWNeK5l9+wuOS3uoXQ0rKeOcwg=",
    urlEndpoint : "https://ik.imagekit.io/adx3pkqj0s6"
});
var httpOptions = {
    host: "ik.imagekit.io",
    path: "/adx3pkqj0s6/",
}

module.exports = {
    Discord,
    client,
    puppeteer,
    on,
    fs,
    http,
    Imagekit,
    imagekitTemplate,
    httpOptions,
}