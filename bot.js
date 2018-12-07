const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();
var util = require('util');

require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

const commandPrefix = '%';
const discordApiKey = process.env.DISCORD_API_KEY;
var myTag;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.username})!`);
    myTag = client.user.username;
//    client.user.setActivity('2-week playtime: ? h', { type: 'WATCHING' } );
//    request(options, callback);
});

client.on('message', msg => {
    if (msg.author.username === myTag) {
        return;
    }

    if (msg.content.startsWith(`${commandPrefix}help`)) {
        // msg.reply('%blacklist.add - add something to your blacklist');
    } else if (msg.content.startsWith(`${commandPrefix}blacklist`) && msg.content.length === 9 + 1) {
        const blacklist = require('./data/blacklist.json');
        var outputString = '';

        for (const item of blacklist.items) {
            outputString += item.name + ', ';
        }
        outputString = outputString.substring(0, outputString.length - 2);
        msg.reply(`Blacklist: ${outputString}`);
    } else if (msg.content.startsWith(`${commandPrefix}blacklist.add `)) {
        const blacklist = require('./data/blacklist.json');
        const fs = require('fs');
        // %TODO, parse new item
        var newItem = 'tessttt';
        blacklist.items.push({name: newItem});
        fs.writeFile('./data/blacklist.json', JSON.stringify(blacklist), 'utf8', function() {});
        msg.reply(`Added new item '${newItem}'`);
    } else if (msg.content.startsWith(`${commandPrefix}`)) {
        msg.reply('Unknown command: ' + msg.content);
    }
});

client.login(discordApiKey);
