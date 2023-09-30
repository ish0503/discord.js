const { Client, Collection, EmbedBuilder } = require("discord.js");
const stock_Schema = require("../models/stock");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let number = 0
    setInterval(() => {
        const list = [`현재 ${client.guilds.cache.size}개의 서버에서 게임`] 
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type: Client.Playing
        })
        number++
    }, 10000)
    console.log(`${client.user.tag} 봇 이 준비되었습니다.`)

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getRandomArbitrary2() {
      const random = Math.random() * 100
      if (random <= 59){
        return getRandomArbitrary(90, 115) / 100
      }else if (random >= 60 && random <= 79){
        return getRandomArbitrary(80, 125) / 100
      }else if (random >= 80 && random <= 94){
        return getRandomArbitrary(70, 135) / 100
      }else if (random >= 95 && random <= 100){
        return getRandomArbitrary(60, 140) / 100
      }
    }

    var stockone = await stock_Schema.findOne({
      name: "껌딱지 주식회사"
    })
    
    var stocktwo = await stock_Schema.findOne({
      name: "새늅 주식회사"
    })
    
    var stockthree= await stock_Schema.findOne({
      name: "로즈 주식회사"
    })
    
    var stockfour = await stock_Schema.findOne({
      name: "토리 코퍼레이션"
    })

    let lastupdate = Date.now()
    
    setInterval(async() => {
      lastupdate = Date.now()
      num = getRandomArbitrary2()
      await stock_Schema.updateOne(
        {name: "껌딱지 주식회사"},
        {money: Math.round((stockone?.money || 10000) * num),
        desc: `껌을 만드는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary2()
      await stock_Schema.updateOne(
        {name: "새늅 주식회사"},
        {money: Math.round((stocktwo?.money || 20000) * num),
        desc: `멸종위기의 새를 보존하는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary2()
      await stock_Schema.updateOne(
        {name: "로즈 주식회사"},
        {money: Math.round((stockthree?.money || 7000) * num),
        desc: `장미를 유전자 조작하는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );
      num = getRandomArbitrary2()
      await stock_Schema.updateOne(
        {name: "토리 코퍼레이션"},
        {money: Math.round((stockfour?.money || 15000) * num),
        desc: `도토리 따는 회사 (마지막 업데이트: <t:${Math.round(lastupdate / 1000)}:R>)`,
        percent: ((num * 100) - 100).toFixed(2),
        },
        {upsert:true},
      );

      stockone = await stock_Schema.findOne({
        name: "껌딱지 주식회사"
      })
      
      stocktwo = await stock_Schema.findOne({
        name: "새늅 주식회사"
      })
      
      stockthree= await stock_Schema.findOne({
        name: "로즈 주식회사"
      })
      
      stockfour = await stock_Schema.findOne({
        name: "토리 코퍼레이션"
      })

    var start = "```diff"
    var end = "```"

    console.log(start + `\n` + `설명: ${stockone.desc}\n주가: ${stockone.money.toLocaleString()} (${(stockone.percent > 0 ? "+" : "-")}${Math.abs(stockone.percent)}%)` + end)
    const embed = new EmbedBuilder()
    .setTitle("주식 정보")
    .setColor("Green")
    .addFields(
        { name: stockone.name+ `\n` + `설명: ${stockone.desc}`, value: start + `\n${(stockone.percent > 0 ? "+" : "-")}주가: ${stockone.money.toLocaleString()} (${(stockone.percent > 0 ? "+" : "-")}${Math.abs(stockone.percent)}%)` + end , inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: stocktwo.name+ `\n` + `설명: ${stocktwo.desc}`, value: start + `\n${(stocktwo.percent > 0 ? "+" : "-")}주가: ${stocktwo.money.toLocaleString()} (${(stocktwo.percent > 0 ? "+" : "-")}${Math.abs(stocktwo.percent)}%)` + end , inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: stockthree.name+ `\n` + `설명: ${stockthree.desc}`, value: start + `\n${(stockthree.percent > 0 ? "+" : "-")}주가: ${stockthree.money.toLocaleString()} (${(stockthree.percent > 0 ? "+" : "-")}${Math.abs(stockthree.percent)}%)` + end , inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: stockfour.name+ `\n` + `설명: ${stockfour.desc}`, value: start + `\n${(stockfour.percent > 0 ? "+" : "-")}주가: ${stockfour.money.toLocaleString()} (${(stockfour.percent > 0 ? "+" : "-")}${Math.abs(stockfour.percent)}%)` + end , inline: true },
    )

    //const chan = client.channels.cache.get("1157578614259339264");
    const channel = client.channels.fetch("1157578614259339264").then(res => {
        res.send({embeds: [embed]})
        .then(function (message) {
              message.react("👍")
              message.react("👎")
             // message.pin()
             // message.delete()
            })
    });
    }, 300000);
  },
};
