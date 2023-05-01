const client = require("../index")
const { DiscordTogether } = require('discord-together')
client.discordTogether = new DiscordTogether(client);
const {CommandInteraction} = require('discord.js')
module.exports = {
    name:'낚시',
    description:'디스코드에서 낚시 게임을 하세요',
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction){
        const channel = interaction.member.voice.channel
        if(!channel) return interaction.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'fishing').then(invite =>{
            return interaction.reply(`${invite.code}`)
        })
    }
}