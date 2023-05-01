const Schema = require("../models/도박")
const comma = require("comma-number")

module.exports = {
    name: "도박",
    async execute(message, args) {
        const ehqkrduqn = await Schema.findOne({
            userid: message.author.id
        })
        if (!ehqkrduqn) return message.reply("**'서요야 지원금'로 돈을 받으세요**")
        if (isNaN(args[0])) return message.reply("**베팅 하실 금액을 입력해 주세요.**")
        if (args.join(" ").includes("-")) return message.reply("**금액엔 -가 포함되면 안돼요 !!!**")
        const money = parseInt(args[0]);
        if (money < 1000) return message.reply("**최소 베팅금액은 1000원 입니다.**")
        if (money > ehqkrduqn.money) return message.reply("**보유하신 돈보다 더 많이 배팅할순 없서요**")
        const random = Math.floor(Math.random() * 101)
        if (random < 50) {
            message.reply(`**패배** 했 서요ㅠ ❌ __**\n-${comma(money)}원**__`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money - money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        } else {
            message.reply(`**승리** 했 서요! ✅ __**\n+${comma(money)}원**__`)
            await Schema.findOneAndUpdate({ userid: message.author.id }, {
                money: ehqkrduqn.money + money,
                userid: message.author.id,
                date: ehqkrduqn.date
            })
        }
    }
}