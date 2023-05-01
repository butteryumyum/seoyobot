module.exports = {
    name: "말해",
    description: "봇이 말을 합니다",
    execute(message, args) {
        if (!args.join(" ")) return message.reply("봇이 말할 문장을 적어주세요")
        if (message.mentions.roles.first()) return message.reply("**역할 멘션은 불가능 합니다.**")
        message.channel.send(`${args.join(" ")}`)
        message.delete()
    }
}