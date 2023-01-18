const {Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ],
  })
const CONFIG = require('../config.json');

//comandos
const commandGoldGanho = require('./commands/goldGanho.js');
const commandGoldCalcular = require('./commands/goldCalcular.js');



client.on("messageCreate", (message)=>{
    if(message.content.startsWith("+goldGanho")){
        commandGoldGanho.goldGanho(message);
    }
})

client.on("messageCreate", (message)=>{
    if(message.content.startsWith("+goldCalcular")){
        commandGoldCalcular.goldCalcular(message);
    }
})


client.on("ready", ()=>{
    client.user.setActivity("Mundo de Warcraft");
    console.log("Bot Online !");
})



client.login(CONFIG.TOKEN);