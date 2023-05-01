module.exports = {
    name:"종료",
    execute(intents){
       if(intents.author.id !== "624181916853075978")return intents.reply('어디서 암살을!');
       intents.reply('시스템 종료 ㅠ');
       setTimeout(() => {
          process.exit();
       },5000);
    },
 };