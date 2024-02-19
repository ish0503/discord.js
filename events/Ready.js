const { Client, Collection, EmbedBuilder } = require("discord.js");
const stock_Schema = require("../models/stock");
const raid_Sechma = require("../models/raidparty")
const bank_Sechma = require("../models/bank")

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

    await raid_Sechma.deleteMany({ __v: 0 });

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var gambling_find = await stock_Schema.find()
    
    setInterval(async() => {
      let today = new Date();   
      let hours = today.getHours();
      let month = today.getDate();

      gambling_find = await stock_Schema.find()

      bank_find = await bank_Sechma.find()

      for (let index = 0; index < bank_find.length; index++) {
        const element = bank_find[index];
        if (element.interesttime + 1 == month){
          await bank_Sechma.updateOne(
            {userid: element.userid},
            { 
                bankmoney: (element.bankmoney || 0), 
                bankmoneytime: (element.bankmoneytime || 0),
                bankmoneycount: (element.bankmoneycount || 0),
                interestmoney: (element.interestmoney || 0),
                interesttime: element.interesttime + 1,
                interestcount: element.interestcount + 1,
                creditrating: (element.creditrating || 5),
            },
            {upsert:true}
        );
        }
        if (element.bankmoneytime + 1 == month){
          await bank_Sechma.updateOne(
            {userid: element.userid},
            { 
                bankmoney: (element.bankmoney || 0), 
                bankmoneytime: element.bankmoneytime + 1,
                bankmoneycount: element.bankmoneycount + 1,
                interestmoney: (element.interestmoney || 0),
                interesttime: (element.interesttime || 0),
                interestcount: (element.interestcount || 0),
                creditrating: (element.creditrating || 5),
            },
            {upsert:true}
        );
        }
      }

      for (let index = 0; index < gambling_find.length; index++) {
        const element = gambling_find[index];
        if (hours >= element.minopentime && hours < element.maxopentime){
          stocks = []
          for (let index = 0; index < element.companys.length; index++) {
            const element2 = element.companys[index];
            num = Math.round(getRandomArbitrary(-element2.firstmoney, element2.firstmoney) / 100)
            stocks.push({
              type: element2.type,
              name: element2.name,
              desc: element2.desc,
              money: element2.money + num,
              lastmoney: element2.money,
              firstmoney: element2.firstmoney,
              ceo: element2.ceo,
              perworkpay: element2.perworkpay,
              level: element2.level,
              calculation: element2.calculation,
              lastmaxbuy: element2.lastmaxbuy,
              allmaxbuy: element2.allmaxbuy,
              employee: element.employee
            })
          }
          await stock_Schema.updateOne(
            { continentname: element.continentname },
            {
              minopentime: element.minopentime,
              maxopentime: element.maxopentime,
              companys: stocks
            },
            { upsert: true },
          );
        }
      }

    var start = "```diff"
    var end = "```"

      for (let index = 0; index < gambling_find.length; index++) {
        const stock = gambling_find[index];
        if (hours >= stock.minopentime && hours < stock.maxopentime){
          const embed = new EmbedBuilder()
          .setTitle(`주식 정보 (대륙:${stock.continentname}) 오픈시간: ${stock.minopentime}시 ~ ${stock.maxopentime}시`)
          .setColor("Green")
        for (let index = 0; index < stock.companys.length; index++) {
          const element = stock.companys[index];
          const percent = ((element.money / element.lastmoney) * 100 - 100).toFixed(2)
          embed.addFields(
            {
              name: `회사이름: ${element.name}\n회사설명: ${element.desc}\n회사종류: ${element.type}`,
              value:
                start +
                `\n${percent >= 0 ? "+" : "-"
                }주가: ${element.money.toLocaleString()} (${percent >= 0 ? "+" : ""
                }${percent}%) \n주식량: ${element.lastmaxbuy} \nceo id: ${element.ceo} \n회사레벨: ${element.level}` +
                end,
              inline: true,
            },
            { name: "\u200B", value: "\u200B" },
          )
        }
        const channel = client.channels.fetch("1157578614259339264").then(res => {
          res.send({ embeds: [embed] })
        });
        }
      }
    }, 300000);
  },
};
