module.exports = {
    name: "타이머",
    execute(message,args){
        const Discord = require('discord.js')
        const Embed = new Discord.MessageEmbed()
        if(isNaN(args[0])) {
            return message.reply(Embed.setColor("#D8BEE4").addField("오류!",`숫자를 입력해주세요!`))
        } else if (args > 43200){
            return message.reply(Embed.setColor("#D8BEE4").addField("오류!",`최대 43200초입니다!`))
        } else {
            message.reply(Embed.setColor("#D8BEE4").addField("타이머 시작!",`${args}초 후에 멘션예정..`))
            setTimeout(function(){
                message.channel.send(`<@${message.author.id}> ${args}초,타이머끄읕`)
            }, (args * 1000))
        }
    }
}
