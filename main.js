const tmi = require('tmi.js');
require('dotenv').config();

const opts = {
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.BOT_OAUTH_TOKEN,
  },
  channels: [
    process.env.BOT_CHANNEL,
  ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; }

  const commandName = msg.trim();

  if (commandName === '!login') {
    client.say(target, `@${context.username} Welcome to the stream!`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
