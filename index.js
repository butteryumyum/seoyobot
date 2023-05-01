const { Client , Intents , Collection, Interaction}  = require('discord.js')
const client = new Client({intents:32767})
module.exports = client;
const fs = require('fs')
const {prefix , token} = require('./config.json')
const mongoose = require("mongoose")
const {DiscordTogether} = require('discord-together')
client.discordTogether = new DiscordTogether(client);

const style = 'R'
const starttime = `<t:${Math.floor(client.readyAt / 1000)}` + (style ? `:${style}` : '') + '>'
client.on('messageCreate', message => {
    if(message.content == "서요업타임"){
        const starttime = `<t:${Math.floor(client.readyAt / 1000)}` + (style ? `:${style}` : '') + '>'
        message.reply(`봇이 온라인 이였던 시간을 알려드릴게요!!\n**업타임 : ${starttime}**`)
    }
})

mongoose.connect("mongodb+srv://butteryumyum:love0225@cluster0.txc13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
}).then(console.log("데이터베이스 연동 완료"))



const date = new Date()
const time = Math.round(date.getTime() / 1000)
const logChannelID= "1030047702194589726";

client.on('messageCreate',message=>{
    if(message.content == `${prefix}유튜브`){
        const channel = message.member.voice.channel
        if(!channel) return message.reply("음성채널에 접속해주세요!")
        client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
            return message.channel.send(invite.code)
        })
    }
})


client.on('messageCreate' , interaction=>{
    if(interaction.content == "<@!880390857541419078>"){
        const embeds = new MessageEmbed()
        .setTitle(` ${interaction.member.user.username} 안뇻ㅇ`)
        .setTimestamp()
        .setDescription('> **서요는 호스팅을 원해요 ㅜ')
        .setColor("RANDOM");
        interaction.reply({ embeds: [embeds]})
    }
})

client.once('ready',()=>{
    let number = 0
    setInterval(() => {
        const list = ["반응형 디스코드봇","서요봇","문의는 버터아님#9369"]
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type:"PLAYING"
        })
        number++
    }, 4000)
    console.log("봇이 준비되었습니다")
})


   
//슬래쉬 커맨드
client.slashcommands = new Collection()
let commands = []
const commandsFile1 = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'))
for (const file of commandsFile1) {
    const command = require(`./slashcommands/${file}`)
    client.slashcommands.set(command.name, command)
    commands.push({ name: command.name, description: command.description })
}

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.slashcommands.get(interaction.commandName)
    if (!command) return
    try {
        await command.execute(interaction)
    } catch (err) {
        console.error(err)
        await interaction.reply({content: "오류가 발생했습니다",ephemeral: true })
    }
})
//레디
client.once('ready', async () => {
    client.guilds.cache.forEach(gd=>{
        gd.commands.set(commands)
    })
    console.log(client.user.username + "로그인 완료")
})

//오류무시 코드
process.on("unhandledRejection",err=>{
    if(err == "DiscordAPIError: Missing Access") return console.log("봇에게 슬래쉬 커맨드를 서버에 푸쉬 할 권한이 없어서 서버에 슬래쉬 커맨드를 푸쉬하지 못했습니다.")
})

//일반 커맨드
client.commands = new Collection()
const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}




client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

// require('./server')()

client.login(token)

