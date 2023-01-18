const { EmbedBuilder } = require('discord.js');
const fs = require("fs");


function goldGanho(message){
    // verificando se o usuario já tem um arquivo com gold ganho
    try {
        var gold = fs.readFileSync(`./golds/${message.author.id}.txt`).toString().split('\n');

        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
        .addFields(
            { name: 'Gold total ganho', value: `${gold}g` },
        )
        .setImage('https://i.imgur.com/4kDbmGd.png')
        .setTimestamp()
    message.channel.send({ embeds: [exampleEmbed] });
    } catch (err) {
        console.log(`Arquivo do usuario ${message.author.username} Não foi encontrado`);
        return message.channel.send("Você ainda não ganhou nenhum gold. :poop: ");
    }
        
 
}

module.exports = { goldGanho };