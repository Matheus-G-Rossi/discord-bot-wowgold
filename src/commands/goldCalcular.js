const { EmbedBuilder } = require('discord.js');
const fs = require("fs");

const prefixCalcular = "+goldCalcular";

function goldCalcular(message) {
    // verificando se o usuario já teve algum lucro e possui armazenado esse lucro em arquivo
    let goldAtual;
    try {
        goldAtual = fs.readFileSync(`./golds/${message.author.id}.txt`).toString();
        console.log("Usuario já tinha gold");
    } catch (err) {
        goldAtual = 0;
        console.log("Usuario não tinha gold");
    }

    // checando se tem 2 argumentos no input
    const args = message.content.slice(prefixCalcular.length).trim().split(' ');
    if (args.length !== 2) {
        return message.channel.send("Comando usado de maneira errada. Segue o exemplo de utilização: +goldCalcular {Gold Gasto} {Gold Ganho}. Exemplo +goldCalcular 300 1500. O bot irá retornar que você teve 1200g de lucro");
    }

    // validando a entrada do input para verificar se tem letras
    if(isNaN(args[0]) || isNaN(args[1])){
        return message.channel.send("Os parametros do comando devem ser apenas numeros: Exemplo +goldCalcular 300 1500. O bot irá retornar que você teve 1200g de lucro"
        )
    }

    // calculos
    let goldGasto = parseFloat(args[0]);
    let goldGanho = parseFloat(args[1]);
    let lucro = goldGanho - goldGasto;
    let lucroTotal = parseFloat(goldAtual) + lucro;
    parseFloat(lucro);
    
     // definindo imagens de acordo com ter lucro e prejuizo
    var imgProfit = "https://media0.giphy.com/media/12gdy23jcbqdvqID9D/giphy.gif?cid=ecf05e47sezz8piniheunys7nrc7kk1i6x77k9txoe7wlfde&rid=giphy.gif&ct=g";
    var imgLoss = "https://media1.giphy.com/media/9Jvj25GWj3hXmMtuXx/giphy.gif?cid=ecf05e47sezz8piniheunys7nrc7kk1i6x77k9txoe7wlfde&rid=giphy.gif&ct=g";
    let img;
    if(lucro > 0){
         img = imgProfit;
    }else{
        img = imgLoss;
    }

    // embed
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
    .addFields(
    { name: 'Lucro feito', value: `${lucro}g` },
    { name: 'Lucro total', value: `${lucroTotal}g` })
    .setImage(img)
    .setTimestamp()

    
    try{
        fs.writeFileSync(`./golds/${message.author.id}.txt`, lucroTotal.toString());
        message.channel.send({ embeds: [exampleEmbed] });
    }catch(err){
        console.log(err);
        return message.channel.send("Erro ao armazenar seu lucro, tente novamente");
    }
    
}

module.exports = { goldCalcular };