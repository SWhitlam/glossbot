var Botkit = require('botkit'),
  config = require('./config.js'),
  acronyms = require('./data/acronyms.json');

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: process.env.SLACK_TOKEN || config.slackToken
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }
});

controller.hears(['what does ([A-Z]{1,}) mean\?','wtf is ([A-Z]{1,})'], ['mention'], function (bot, message) {
  var acronym = message.match[1];
  if (acronyms[acronym]) {
    return bot.reply(message, acronym + ' usually stands for ' + acronyms[acronym]);
  }
  else {
    return bot.reply(message, 'Not a scooby do');
  }
});