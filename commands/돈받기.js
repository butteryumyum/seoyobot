const comma = require("comma-number")

module.exports = {
    name: "월급",
    async execute(message) {
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const schema = require("../models/도박")
        const ehqkrduqn = await schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) {
            let newData = new schema({
                money: parseInt(10000),
                userid: message.author.id,
                date: date
            })
            newData.save()
            message.reply("앗 아직 돈이 없구나? 내가 인심써서 **10000원을 줄께**")
        } else {
            if (ehqkrduqn.date == date) return message.channel.send("이미 돈을 받았 서요!")
            const money = parseInt(ehqkrduqn.money)
            await schema.findOneAndUpdate({ userid: message.author.id }, {
                money: money + 10000,
                userid: message.author.id,
                date: date
            })
            const f = money + 10000
            message.reply(`10000원 옛다 ! \n현재잔액 : ${comma(f)}`)
        }
    }
}